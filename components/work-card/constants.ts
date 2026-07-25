import tykloMobile from "@/public/img/work/tyklo/tyklo-cover--mobile.webp"
import tykloMobileDark from "@/public/img/work/tyklo/tyklo-cover-dark--mobile.webp"
import tykloDesktop from "@/public/img/work/tyklo/tyklo-cover--desktop.webp"
import tykloDesktopDark from "@/public/img/work/tyklo/tyklo-cover-dark--desktop.webp"

export const SELECTED_WORK_ITEMS = [
  {
    id: "tyklo",
    liveUrl: "https://tyklo.eu",
    image: {
      src: {
        mobile: {
          default: tykloMobile,
          dark: tykloMobileDark,
        },
        desktop: {
          default: tykloDesktop,
          dark: tykloDesktopDark,
        },
      },
      alt: "Tyklo website preview",
    },
    metricIds: [1, 2, 3, 4],
  },
] as const

export type SelectedWorkItemId = (typeof SELECTED_WORK_ITEMS)[number]["id"]
