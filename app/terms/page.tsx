import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de Suite IA Comercial.",
};

export default function Page() {
  return <LegalDocument title="Términos y condiciones">{<><p><strong>Vigencia: 18 de octubre de 2026.</strong></p>
      <p>Este documento regula el acceso a ScopeSnap y FeedbackDigest, herramientas de demostración que transforman briefs y comentarios en resultados asistidos por inteligencia artificial.</p>
      <h2>1. Responsable y contacto</h2><p>El responsable del servicio es el titular de Suite IA Comercial, Juan David Cuero. Para consultas, escribe a <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>. La identificación fiscal y domicilio de notificaciones del responsable deben completarse antes de ofrecer el servicio comercialmente.</p>
      <h2>2. Uso del servicio</h2><p>El usuario puede enviar texto o archivos CSV/TXT para obtener estimaciones o resúmenes. Debe contar con autorización para compartir la información de terceros y evitar datos sensibles, secretos comerciales, credenciales, datos de menores o información que no tenga derecho a procesar.</p>
      <h2>3. Resultados de IA</h2><p>Los resultados son orientativos y pueden ser incompletos o inexactos. No constituyen asesoría profesional, presupuesto vinculante, decisión automatizada ni sustituyen la revisión humana. El usuario debe validar supuestos, cifras, citas y recomendaciones antes de usarlos o compartirlos.</p>
      <h2>4. Propiedad y uso aceptable</h2><p>El usuario conserva los derechos sobre el contenido que aporta. Autoriza su tratamiento únicamente para prestar la función solicitada y proteger el servicio. No debe intentar vulnerar controles, enviar código malicioso ni usar la plataforma para fines ilícitos.</p>
      <h2>5. Disponibilidad y cambios</h2><p>La herramienta puede modificarse o interrumpirse por mantenimiento, seguridad o cambios de proveedores. No se garantiza disponibilidad continua ni exactitud absoluta.</p>
      <h2>6. Pagos y reembolsos</h2><p>Esta versión no cobra suscripciones ni procesa pagos. Si una oferta de pago se habilita en el futuro, sus condiciones y derechos de retracto o reembolso se informarán antes de la compra y se sujetarán a la ley aplicable.</p>
      <h2>7. Ley aplicable</h2><p>Estos términos se interpretan conforme a las normas colombianas aplicables y, cuando corresponda, a las normas de protección de datos de la Unión Europea. Nada limita derechos irrenunciables del consumidor.</p>
      <p>El uso de cada herramienta implica la aceptación expresa de estos términos y de las condiciones de reembolso aplicables, previa lectura de la política de privacidad.</p></>}</LegalDocument>;
}