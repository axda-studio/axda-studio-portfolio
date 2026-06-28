"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

import { useScopedI18n } from "@/locales/client"
import { HeroCtas } from "@/components/hero"
import { TrackedSection } from "@/components/section-tracker"

export const WovenLightHero = () => {
  const t = useScopedI18n("hero")

  return (
    <TrackedSection
      section="hero"
      id="hero"
      className="relative flex h-screen w-full flex-col items-center justify-center"
    >
      <WovenCanvas />
      <div className="relative z-10 flex flex-col gap-y-8 px-4 text-center sm:gap-y-10 md:gap-y-12 lg:gap-y-16">
        <h1 className="font-serif text-xl leading-tight font-normal sm:text-2xl md:text-4xl lg:text-6xl">
          <span className="font-sans text-4xl font-bold sm:text-5xl md:text-6xl lg:text-8xl">
            {t("title.headline.prefix")}{" "}
            <span className="font-black text-primary">
              {t("title.headline.emphasis")}
            </span>
          </span>
          <br /> {t("title.line2")} <br />
          {t("title.line3")}
        </h1>
        <HeroCtas
          primaryLabel={t("ctaPrimary")}
          secondaryLabel={t("ctaSecondary")}
        />
      </div>
    </TrackedSection>
  )
}

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Skip the heavy Three.js work on mobile — the canvas is hidden there.
    if (window.matchMedia("(max-width: 1023px)").matches) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    const mouse = new THREE.Vector2(0, 0)
    const clock = new THREE.Clock()

    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches

    // --- Woven Silk ---
    const particleCount = 50000
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    const geometry = new THREE.BufferGeometry()
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32)

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count
      const x = torusKnot.attributes.position.getX(vertexIndex)
      const y = torusKnot.attributes.position.getY(vertexIndex)
      const z = torusKnot.attributes.position.getZ(vertexIndex)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.8, isDarkMode ? 0.5 : 0.7)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      velocities[i * 3] = 0
      velocities[i * 3 + 1] = 0
      velocities[i * 3 + 2] = 0
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      transparent: true,
      opacity: isDarkMode ? 1.0 : 0.8,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0)

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const iy = i * 3 + 1
        const iz = i * 3 + 2

        const currentPos = new THREE.Vector3(
          positions[ix],
          positions[iy],
          positions[iz]
        )
        const originalPos = new THREE.Vector3(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        )
        const velocity = new THREE.Vector3(
          velocities[ix],
          velocities[iy],
          velocities[iz]
        )

        const dist = currentPos.distanceTo(mouseWorld)
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01
          const direction = new THREE.Vector3()
            .subVectors(currentPos, mouseWorld)
            .normalize()
          velocity.add(direction.multiplyScalar(force))
        }

        // Return to original position
        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.001)
        velocity.add(returnForce)

        // Damping
        velocity.multiplyScalar(0.95)

        positions[ix] += velocity.x
        positions[iy] += velocity.y
        positions[iz] += velocity.z

        velocities[ix] = velocity.x
        velocities[iy] = velocity.y
        velocities[iz] = velocity.z
      }
      geometry.attributes.position.needsUpdate = true

      points.rotation.y = elapsedTime * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      data-testid="hero-canvas"
      className="absolute inset-0 z-0 hidden lg:block"
    />
  )
}
