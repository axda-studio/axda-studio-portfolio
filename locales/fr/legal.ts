export default {
  meta: {
    title: "Mentions légales & confidentialité",
    description:
      "Qui édite ce site, ce qu’il mesure, quels sous-traitants interviennent et comment retirer son consentement.",
  },
  eyebrow: "Mentions légales",
  title: "Mentions légales & confidentialité",
  intro:
    "Cette page réunit les mentions légales exigées des éditeurs français et l’information prévue aux articles 13 et 14 du RGPD. Elle est volontairement courte, parce que ce site collecte très peu.",
  lastUpdated: "Dernière mise à jour",
  backToHome: "Retour à l’accueil",
  publisher: {
    title: "Éditeur",
    // No gloss: the register wording is already French.
    formValue: "{form}",
    labels: {
      entity: "Entité",
      form: "Forme juridique",
      registration: "Immatriculation",
      address: "Siège social",
      director: "Directeur de la publication",
      email: "Contact",
    },
  },
  host: {
    title: "Hébergement",
    body: "Le site est hébergé et servi par le prestataire ci-dessous. Les requêtes de mesure d’audience étant relayées par ce domaine (voir « Sous-traitants » plus bas), l’adresse IP des visiteurs passe par l’hébergeur avant tout tiers.",
    labels: {
      entity: "Hébergeur",
      address: "Adresse",
      url: "Site web",
    },
  },
  controller: {
    title: "Responsable de traitement",
    body: "L’éditeur mentionné ci-dessus est responsable de traitement pour tout ce qui est décrit sur cette page. Toute question sur vos données, comme toute demande d’exercice des droits listés plus bas, passe par l’adresse de contact ci-dessus.",
  },
  purposes: {
    title: "Pourquoi des données sont traitées",
    items: {
      analytics: {
        term: "Mesure d’audience et suivi des erreurs",
        description:
          "Compter les visites, voir quelles sections sont lues, revoir des enregistrements de navigation pour repérer ce qui bloque, et repérer les erreurs JavaScript sur de vrais appareils. Soumis à consentement, et désactivé tant que vous n’acceptez pas.",
      },
      contact: {
        term: "Vous répondre",
        description:
          "Si vous écrivez ou utilisez le lien de contact, le message et l’adresse que vous envoyez sont traités pour que l’échange ait lieu.",
      },
      technical: {
        term: "Servir le site",
        description:
          "Mémoriser votre langue et votre thème, mémoriser votre choix de cookies, et les journaux serveur que l’hébergeur conserve pour délivrer les pages et résister aux abus.",
      },
    },
  },
  data: {
    title: "Ce qui est collecté",
    body: "Avec la mesure d’audience activée : pages vues, référent, localisation approximative déduite de l’adresse IP, type de navigateur et d’appareil, un identifiant anonyme d’appareil et de session, un enregistrement de votre navigation — les pages telles qu’elles s’affichaient, vos clics, vos défilements et vos mouvements de souris, tout ce que vous saisissez dans un champ étant masqué dans votre navigateur avant l’envoi — et, en cas de bug, le message d’erreur et sa pile d’appels. Aucun compte, aucun profil, aucun identifiant publicitaire, et rien n’est vendu ni partagé à des fins marketing.",
  },
  noServer: {
    title: "Le formulaire n’envoie rien à un serveur",
    body: "Le formulaire de brief compose un e-mail dans votre propre logiciel de messagerie et vous le remet. Votre nom, votre adresse et votre brief n’atteignent aucun serveur ici. Seuls trois éléments anonymes sont enregistrés pour la mesure d’audience, et uniquement avec consentement : si un nom a été saisi, si une adresse a été saisie, et le nombre de caractères du brief.",
  },
  basis: {
    title: "Bases légales",
    body: "La mesure d’audience et le suivi des erreurs reposent sur votre consentement, article 6-1-a du RGPD, recueilli via le bandeau cookies et retirable à tout moment. La réponse à vos messages repose sur l’article 6-1-b — mesures prises à votre demande avant un contrat. Le maintien en état et la sécurité du site reposent sur l’intérêt légitime de l’article 6-1-f.",
  },
  processors: {
    title: "Sous-traitants",
    body: "Deux prestataires traitent des données pour le compte de l’éditeur, sous contrat et sans droit de les utiliser à leurs propres fins.",
    items: {
      analytics: {
        term: "Mesure d’audience",
        description:
          "{processor} — {region}, les données d’événements étant stockées dans l’Union européenne. Les requêtes sont relayées par ce domaine plutôt qu’envoyées directement à un domaine tiers.",
      },
      host: {
        term: "Hébergement",
        description:
          "{host} — société américaine qui sert ce site depuis son réseau de périphérie. Tout transfert hors EEE est encadré par les garanties de son accord de traitement, à savoir le cadre de protection des données UE–États-Unis et les clauses contractuelles types.",
      },
    },
  },
  retention: {
    title: "Durées de conservation",
    body: "Les événements de mesure d’audience sont conservés {analyticsMonths} mois, puis supprimés. Les enregistrements de navigation sont conservés {replayDays} jours, puis supprimés. Votre choix de cookies est conservé {consentMonths} mois, après quoi le bandeau redemande. Les e-mails ne sont conservés que le temps de l’échange. Les journaux d’accès suivent la durée courte propre à l’hébergeur.",
  },
  storage: {
    title: "Cookies et stockage local",
    body: "Un seul de ces éléments dépend du consentement. Les trois autres sont strictement nécessaires et sont déposés quel que soit votre choix.",
    columns: {
      name: "Nom",
      kind: "Type",
      purpose: "Finalité",
      duration: "Durée",
      consent: "Consentement",
    },
    consentRequired: "Requis",
    consentExempt: "Exempté",
    items: {
      locale: {
        kind: "Cookie",
        purpose: "Mémorise la version linguistique à servir.",
        duration: "12 mois",
      },
      theme: {
        kind: "Stockage local",
        purpose: "Mémorise le mode clair ou sombre.",
        duration: "Jusqu’à effacement",
      },
      consent: {
        kind: "Stockage local",
        purpose:
          "Enregistre le choix de cookies effectué, pour ne pas vous redemander à chaque page.",
        duration: "6 mois",
      },
      analytics: {
        kind: "Cookie et stockage local",
        purpose:
          "Identifiants anonymes d’appareil et de session utilisés pour la mesure d’audience et pour reconstituer l’enregistrement d’une session. Écrits seulement après acceptation.",
        duration: "12 mois",
      },
    },
  },
  rights: {
    title: "Vos droits",
    body: "Le RGPD vous permet de demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement ou leur portabilité, et de vous opposer au traitement. Écrivez à l’adresse de contact ci-dessus ; la réponse est due dans un délai d’un mois.",
    withdraw:
      "Vous pouvez retirer ou modifier votre consentement à la mesure d’audience à tout moment, sans justification et sans conséquence sur l’usage du site :",
    complaint:
      "Si vous estimez que vos données sont mal traitées, vous pouvez introduire une réclamation auprès de l’autorité de contrôle française :",
  },
  changes: {
    title: "Modifications",
    body: "Si cette notice évolue d’une manière qui touche à ce que vous avez accepté, l’enregistrement de consentement est invalidé et le bandeau redemande, plutôt que de considérer votre réponse précédente comme toujours valable.",
  },
} as const
