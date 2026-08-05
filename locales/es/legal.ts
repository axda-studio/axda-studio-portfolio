export default {
  meta: {
    title: "Aviso legal y privacidad",
    description:
      "Quién publica este sitio, qué mide, qué encargados intervienen y cómo retirar el consentimiento.",
  },
  eyebrow: "Aviso legal",
  title: "Aviso legal y privacidad",
  intro:
    "Esta página reúne el aviso legal exigido a los editores franceses y la información prevista en los artículos 13 y 14 del RGPD. Es deliberadamente breve, porque este sitio recoge muy poco.",
  lastUpdated: "Última actualización",
  backToHome: "Volver al inicio",
  publisher: {
    title: "Editor",
    formValue: "{form} — empresario individual",
    labels: {
      entity: "Entidad",
      form: "Forma jurídica",
      registration: "Registro",
      address: "Domicilio social",
      director: "Director de publicación",
      email: "Contacto",
    },
  },
  host: {
    title: "Alojamiento",
    body: "El sitio está alojado y servido por el proveedor indicado abajo. Como las peticiones de analítica pasan por este dominio (véase «Encargados» más abajo), la dirección IP de las visitas llega al proveedor de alojamiento antes que a cualquier tercero.",
    labels: {
      entity: "Proveedor",
      address: "Dirección",
      url: "Sitio web",
    },
  },
  controller: {
    title: "Responsable del tratamiento",
    body: "El editor indicado arriba es el responsable del tratamiento de todo lo descrito en esta página. Cualquier duda sobre tus datos, y cualquier solicitud para ejercer los derechos listados abajo, se dirige a la dirección de contacto anterior.",
  },
  purposes: {
    title: "Por qué se tratan datos",
    items: {
      analytics: {
        term: "Medición de audiencia y seguimiento de errores",
        description:
          "Contar visitas, ver qué secciones se leen, revisar grabaciones de navegación para detectar qué confunde, y detectar errores de JavaScript en dispositivos reales. Se basa en tu consentimiento y está desactivado mientras no aceptes.",
      },
      contact: {
        term: "Responderte",
        description:
          "Si escribes o usas el enlace de contacto, el mensaje y la dirección que envías se tratan para que el intercambio pueda producirse.",
      },
      technical: {
        term: "Servir el sitio",
        description:
          "Recordar tu idioma y tu tema, recordar tu elección de cookies, y los registros de servidor que el proveedor conserva para entregar las páginas y resistir abusos.",
      },
    },
  },
  data: {
    title: "Qué se recoge",
    body: "Con la analítica activada: páginas vistas, referente, ubicación aproximada deducida de la dirección IP, tipo de navegador y dispositivo, un identificador anónimo de dispositivo y sesión, una grabación de tu visita — las páginas tal como se mostraron, tus clics, tu desplazamiento y los movimientos del ratón, con todo lo que escribas en un campo enmascarado dentro de tu navegador antes del envío — y, si algo falla, el mensaje de error y su traza. Sin cuenta, sin perfil, sin identificador publicitario, y nada se vende ni se comparte con fines de marketing.",
  },
  noServer: {
    title: "El formulario no envía nada a un servidor",
    body: "El formulario de brief redacta un correo en tu propio cliente de email y te lo entrega. Tu nombre, tu dirección y tu brief no llegan a ningún servidor aquí. Solo se registran tres datos anónimos para la analítica, y únicamente con consentimiento: si se rellenó un nombre, si se rellenó una dirección, y cuántos caracteres tenía el brief.",
  },
  basis: {
    title: "Bases jurídicas",
    body: "La medición de audiencia y el seguimiento de errores se basan en tu consentimiento, artículo 6.1.a del RGPD, recogido mediante el banner de cookies y retirable en cualquier momento. La respuesta a tus mensajes se basa en el artículo 6.1.b — medidas adoptadas a tu solicitud antes de un contrato. Mantener el sitio disponible y seguro se basa en el interés legítimo del artículo 6.1.f.",
  },
  processors: {
    title: "Encargados del tratamiento",
    body: "Dos proveedores tratan datos por cuenta del editor, bajo contrato y sin derecho a usarlos para sus propios fines.",
    items: {
      analytics: {
        term: "Analítica",
        description:
          "{processor} — {region}, con los datos de eventos almacenados en la Unión Europea. Las peticiones pasan por este dominio en lugar de enviarse directamente a un dominio de terceros.",
      },
      host: {
        term: "Alojamiento",
        description:
          "{host} — empresa estadounidense que sirve este sitio desde su red de borde. Cualquier transferencia fuera del EEE está cubierta por las garantías de su acuerdo de tratamiento: el marco de privacidad de datos UE–EE. UU. y las cláusulas contractuales tipo.",
      },
    },
  },
  retention: {
    title: "Cuánto tiempo se conserva",
    body: "Los eventos de analítica se conservan {analyticsMonths} meses y luego se eliminan. Las grabaciones de sesión se conservan {replayDays} días y luego se eliminan. Tu elección de cookies se conserva {consentMonths} meses, tras lo cual el banner vuelve a preguntar. Los correos se conservan solo el tiempo que exija el intercambio. Los registros de acceso siguen la corta retención propia del proveedor.",
  },
  storage: {
    title: "Cookies y almacenamiento local",
    body: "Solo uno de estos elementos depende del consentimiento. Los otros tres son estrictamente necesarios y se establecen sea cual sea tu elección.",
    columns: {
      name: "Nombre",
      kind: "Tipo",
      purpose: "Finalidad",
      duration: "Duración",
      consent: "Consentimiento",
    },
    consentRequired: "Necesario",
    consentExempt: "Exento",
    items: {
      locale: {
        kind: "Cookie",
        purpose: "Recuerda qué versión de idioma servir.",
        duration: "12 meses",
      },
      theme: {
        kind: "Almacenamiento local",
        purpose: "Recuerda el modo claro u oscuro.",
        duration: "Hasta que lo borres",
      },
      consent: {
        kind: "Almacenamiento local",
        purpose:
          "Registra la elección de cookies que hiciste, para no preguntarte en cada página.",
        duration: "6 meses",
      },
      analytics: {
        kind: "Cookie y almacenamiento local",
        purpose:
          "Identificadores anónimos de dispositivo y sesión usados para medir la audiencia y para reconstruir la grabación de una sesión. Solo se escriben tras aceptar.",
        duration: "12 meses",
      },
    },
  },
  rights: {
    title: "Tus derechos",
    body: "El RGPD te permite solicitar el acceso a tus datos, su rectificación, su supresión, la limitación del tratamiento o su portabilidad, y oponerte al tratamiento. Escribe a la dirección de contacto anterior; la respuesta se debe en el plazo de un mes.",
    withdraw:
      "Puedes retirar o cambiar tu consentimiento a la analítica en cualquier momento, sin justificación y sin consecuencias para el uso del sitio:",
    complaint:
      "Si consideras que tus datos se tratan indebidamente, puedes presentar una reclamación ante la autoridad de control francesa:",
  },
  changes: {
    title: "Cambios",
    body: "Si este aviso cambia de forma que afecte a lo que aceptaste, el registro de consentimiento se invalida y el banner vuelve a preguntar, en lugar de dar por válida tu respuesta anterior.",
  },
} as const
