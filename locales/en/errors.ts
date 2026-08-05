export default {
  notFound: {
    meta: {
      title: "Page not found",
      description:
        "This address does not exist on axda-studio.fr. Head back to the home page.",
    },
    eyebrow: "Error 404",
    title: "This page",
    emphasis: "slipped away.",
    body: "Either the address is wrong, or it never existed. Nothing behind it is broken — the rest of the site is exactly where you left it.",
    backToHome: "Back to home",
  },
  boundary: {
    eyebrow: "Error 500",
    title: "Something",
    emphasis: "gave way.",
    body: "An unexpected error stopped this page from rendering. It has been reported. Trying again clears most of them.",
    retry: "Try again",
    backToHome: "Back to home",
  },
} as const
