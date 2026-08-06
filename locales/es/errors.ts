export default {
  notFound: {
    meta: {
      title: "Página no encontrada",
      description:
        "Esta dirección no existe en axda-studio.fr. Vuelve a la página de inicio.",
    },
    eyebrow: "Error 404",
    title: "Esta página",
    emphasis: "se ha esfumado.",
    body: "O la dirección es incorrecta, o nunca existió. Nada está roto detrás: el resto del sitio sigue intacto.",
    backToHome: "Volver al inicio",
  },
  boundary: {
    eyebrow: "Error 500",
    title: "Algo",
    emphasis: "ha fallado.",
    body: "Un error inesperado impidió mostrar esta página. Ya se ha notificado. Reintentar resuelve la mayoría.",
    retry: "Reintentar",
    backToHome: "Volver al inicio",
  },
} as const
