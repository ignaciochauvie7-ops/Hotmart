/**
 * Curso de Reparación de Electrodomésticos — entrega por email (SOLO SERVIDOR: no importar desde componentes
 * React, para que estos enlaces no acaben en el JavaScript público).
 *
 * Tras el pago confirmado (webhook de Dodo) se envía un email con los enlaces de
 * acceso de cada producto comprado. Rellena `url` con el sitio donde alojes los
 * vídeos y los PDF. Si un producto no tiene enlaces, no se envía nada por él.
 */
export interface AccessLink {
  label: string;
  url: string;
}

export const delivery: Record<'main' | 'bump' | 'upsell', AccessLink[]> = {
  main: [
    // { label: 'Curso completo (10 módulos)', url: 'https://…' },
    // { label: 'Bonus 1: Fichas de diagnóstico de averías (PDF)', url: 'https://…' },
  ],
  bump: [
    // { label: 'Guía de repuestos: dónde comprar cada pieza más barata en España', url: 'https://…' },
  ],
  upsell: [
    // { label: 'Electrodomésticos como nuevos', url: 'https://…' },
  ],
};

export const emailTexts = {
  subject: 'Tu acceso al Curso de Reparación de Electrodomésticos',
  heading: '¡Ya tienes tu acceso!',
  intro: 'Gracias por tu compra. Aquí tienes todo lo que has adquirido:',
  note: 'Guarda este email para volver a entrar cuando quieras. Si tienes cualquier problema, responde a este mensaje.',
};
