export default {
  meta: {
    title: "Legal & privacy",
    description:
      "Who publishes this site, what it measures, which processors are involved, and how to withdraw consent.",
  },
  eyebrow: "Legal notice",
  title: "Legal & privacy",
  intro:
    "This page covers the legal notice required of French publishers and the information required by Articles 13 and 14 of the GDPR. It is deliberately short, because this site collects very little.",
  lastUpdated: "Last updated",
  backToHome: "Back to home",
  publisher: {
    title: "Publisher",
    // {form} is the untranslated INSEE register wording, glossed for readers who
    // don't read French. Never leave a locale's value empty — next-international
    // falls back to printing the key.
    formValue: "{form} — sole proprietorship",
    labels: {
      entity: "Entity",
      form: "Legal form",
      registration: "Registration",
      address: "Registered address",
      director: "Publication director",
      email: "Contact",
    },
  },
  host: {
    title: "Hosting",
    body: "The site is hosted and served by the provider below. Because analytics requests are proxied through this domain (see “Analytics” further down), visitor IP addresses reach the host before any third party.",
    labels: {
      entity: "Host",
      address: "Address",
      url: "Website",
    },
  },
  controller: {
    title: "Data controller",
    body: "The publisher named above is the data controller for everything described on this page. Any question about your data, and any request to exercise the rights listed below, goes to the contact address above.",
  },
  purposes: {
    title: "Why data is processed",
    items: {
      analytics: {
        term: "Audience measurement and error monitoring",
        description:
          "Counting visits, seeing which sections people read, replaying visits to find where the page confuses people, and catching JavaScript errors on real devices. Consent-based, and off unless you accept.",
      },
      contact: {
        term: "Replying to you",
        description:
          "If you email or use the contact link, the message and address you send are processed so the exchange can happen.",
      },
      technical: {
        term: "Serving the site",
        description:
          "Remembering your language and theme, remembering your cookie choice, and the server logs the host keeps to deliver pages and resist abuse.",
      },
    },
  },
  data: {
    title: "What is collected",
    body: "With analytics enabled: pages viewed, referrer, approximate location derived from your IP address, browser and device type, an anonymous device and session identifier, a recording of your visit — the pages as they appeared, your clicks, scrolling and mouse movement, with anything you type into a field masked inside your browser before it is sent — and, if something breaks, the error message and stack trace. No account, no profile, no advertising identifier, and nothing is sold or shared for marketing.",
  },
  noServer: {
    title: "The contact form sends nothing to a server",
    body: "The brief form on this site builds an email in your own mail client and hands it over. Your name, address and brief never reach a server here. Only three anonymous facts are recorded for analytics, and only with consent: whether a name was filled, whether an address was filled, and how many characters the brief contained.",
  },
  basis: {
    title: "Legal basis",
    body: "Audience measurement and error monitoring rest on your consent, Article 6(1)(a) GDPR, collected through the cookie banner and withdrawable at any time. Replying to your messages rests on Article 6(1)(b) — steps taken at your request before a contract. Keeping the site available and secure rests on the legitimate interest of Article 6(1)(f).",
  },
  processors: {
    title: "Processors",
    body: "Two providers process data on the publisher's behalf, under contract and with no right to use it for their own purposes.",
    items: {
      analytics: {
        term: "Analytics",
        description:
          "{processor} — {region}, with event data stored in the European Union. Requests are proxied through this domain rather than sent to a third-party domain directly.",
      },
      host: {
        term: "Hosting",
        description:
          "{host} — a United States company serving this site from its edge network. Any transfer outside the EEA is covered by the safeguards in its data processing agreement, namely the EU–U.S. Data Privacy Framework and standard contractual clauses.",
      },
    },
  },
  retention: {
    title: "How long it is kept",
    body: "Analytics events are kept for {analyticsMonths} months, then deleted. Session recordings are kept for {replayDays} days, then deleted. Your cookie choice is kept for {consentMonths} months, after which the banner asks again. Emails are kept only as long as the exchange requires. Host access logs follow the host's own short retention.",
  },
  storage: {
    title: "Cookies and local storage",
    body: "Only one of these depends on consent. The other three are strictly necessary and are set whatever you choose.",
    columns: {
      name: "Name",
      kind: "Kind",
      purpose: "Purpose",
      duration: "Duration",
      consent: "Consent",
    },
    consentRequired: "Required",
    consentExempt: "Exempt",
    items: {
      locale: {
        kind: "Cookie",
        purpose: "Remembers which language version to serve.",
        duration: "12 months",
      },
      theme: {
        kind: "Local storage",
        purpose: "Remembers light or dark mode.",
        duration: "Until you clear it",
      },
      consent: {
        kind: "Local storage",
        purpose:
          "Records the cookie choice you made, so you are not asked on every page.",
        duration: "6 months",
      },
      analytics: {
        kind: "Cookie and local storage",
        purpose:
          "Anonymous device and session identifiers used for audience measurement and to stitch a session recording together. Only written after you accept.",
        duration: "12 months",
      },
    },
  },
  rights: {
    title: "Your rights",
    body: "Under the GDPR you may request access to your data, correction, erasure, restriction of processing, or portability, and you may object to processing. Write to the contact address above; a reply is due within one month.",
    withdraw:
      "You can withdraw or change your analytics consent at any time, with no explanation and no consequence for using the site:",
    complaint:
      "If you believe your data is mishandled, you can lodge a complaint with the French supervisory authority:",
  },
  changes: {
    title: "Changes",
    body: "If this notice changes in a way that affects what you agreed to, the consent record is invalidated and the banner asks again rather than assuming your earlier answer still stands.",
  },
} as const
