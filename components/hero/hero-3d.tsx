"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 50_000
const TORUS_RADIUS = 1.5
const TORUS_TUBE = 0.5
const INTERACTION_RADIUS = 1.5

export function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Respect user preference.
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const getSize = () => ({
      width: container.clientWidth,
      height: Math.max(container.clientHeight, 1),
    })

    const { width: w0, height: h0 } = getSize()

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w0 / h0, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w0, h0)
    container.appendChild(renderer.domElement)

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    const torusKnot = new THREE.TorusKnotGeometry(
      TORUS_RADIUS,
      TORUS_TUBE,
      200,
      32
    )
    const knotVertexCount = torusKnot.attributes.position.count

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vertexIndex = i % knotVertexCount
      const x = torusKnot.attributes.position.getX(vertexIndex)
      const y = torusKnot.attributes.position.getY(vertexIndex)
      const z = torusKnot.attributes.position.getZ(vertexIndex)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      // Warm terracotta spread to match the brand primary (oklch(50% 0.131 38)).
      // Lightness kept low so the particles read as darker dots against the
      // cream background under NormalBlending.
      const color = new THREE.Color()
      color.setHSL(0.04 + Math.random() * 0.04, 0.7, 0.35)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 0.8,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const mouse = new THREE.Vector2(0, 0)
    const clock = new THREE.Clock()

    const currentPos = new THREE.Vector3()
    const originalPos = new THREE.Vector3()
    const velocity = new THREE.Vector3()
    const direction = new THREE.Vector3()
    const returnForce = new THREE.Vector3()
    const mouseWorld = new THREE.Vector3()

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()
      mouseWorld.set(mouse.x * 3, mouse.y * 3, 0)

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3
        const iy = ix + 1
        const iz = ix + 2

        currentPos.set(positions[ix], positions[iy], positions[iz])
        originalPos.set(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        )
        velocity.set(velocities[ix], velocities[iy], velocities[iz])

        const dist = currentPos.distanceTo(mouseWorld)
        if (dist < INTERACTION_RADIUS) {
          const force = (INTERACTION_RADIUS - dist) * 0.01
          direction.subVectors(currentPos, mouseWorld).normalize()
          velocity.add(direction.multiplyScalar(force))
        }

        returnForce.subVectors(originalPos, currentPos).multiplyScalar(0.001)
        velocity.add(returnForce)
        velocity.multiplyScalar(0.95)

        positions[ix] += velocity.x
        positions[iy] += velocity.y
        positions[iz] += velocity.z
        velocities[ix] = velocity.x
        velocities[iy] = velocity.y
        velocities[iz] = velocity.z
      }

      geometry.attributes.position.needsUpdate = true
      points.rotation.y = elapsed * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = getSize()
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      torusKnot.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    />
  )
}
