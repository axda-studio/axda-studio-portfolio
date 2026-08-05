export default {
  notFound: {
    meta: {
      title: "Page introuvable",
      description:
        "Cette adresse n'existe pas sur axda-studio.fr. Retournez à l'accueil.",
    },
    eyebrow: "Erreur 404",
    title: "Cette page",
    emphasis: "s'est envolée.",
    body: "Soit l'adresse est erronée, soit elle n'a jamais existé. Rien n'est cassé derrière : le reste du site est intact.",
    backToHome: "Retour à l'accueil",
  },
  boundary: {
    eyebrow: "Erreur 500",
    title: "Quelque chose",
    emphasis: "a lâché.",
    body: "Une erreur inattendue a empêché l'affichage de cette page. Elle a été signalée. Réessayer suffit le plus souvent.",
    retry: "Réessayer",
    backToHome: "Retour à l'accueil",
  },
} as const
