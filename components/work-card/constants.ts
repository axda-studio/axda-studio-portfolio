export const SELECTED_WORK_ITEMS = [
  {
    id: "tyklo",
    liveUrl: "https://tyklo.eu",
    image: {
      src: {
        mobile: {
          default: "/img/work/tyklo/tyklo-cover--mobile.png",
          dark: "/img/work/tyklo/tyklo-cover-dark--mobile.png",
        },
        desktop: {
          default: "/img/work/tyklo/tyklo-cover--desktop.png",
          dark: "/img/work/tyklo/tyklo-cover-dark--desktop.png",
        },
      },
      alt: "Tyklo website preview",
    },
    metricIds: [1, 2, 3, 4],
  },
] as const

export type SelectedWorkItemId = (typeof SELECTED_WORK_ITEMS)[number]["id"]
