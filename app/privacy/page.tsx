import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Suite IA Comercial.",
};

export default function Page() {
  return <LegalDocument title="Política de privacidad">{<><p><strong>Vigencia: 18 de octubre de 2026.</strong></p>
      <p>Esta política informa cómo Suite IA Comercial trata los datos que se ingresan en ScopeSnap y FeedbackDigest. El responsable es Juan David Cuero, contacto: <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>. El domicilio y la identificación fiscal deben completarse antes de lanzar un servicio comercial.</p>
      <h2>Datos y finalidades</h2><p>Se procesan los briefs, comentarios y archivos que el usuario envía; los datos técnicos mínimos de la solicitud; y el registro visual de consentimiento (fecha y hora, IP truncada). Se usan para ejecutar el análisis solicitado, prevenir abuso, mantener la seguridad y atender derechos o consultas.</p>
      <h2>Procesamiento mediante IA</h2><p>El texto se envía desde el servidor a la API de Gemini de Google para generar la respuesta. La aplicación no necesita una clave de IA en el navegador y no solicita almacenar la solicitud mediante la API GenerateContent. Google puede tratar contenido y datos técnicos según el nivel de facturación, sus términos vigentes y la configuración del proyecto; pueden existir registros limitados para seguridad y prevención de abuso. Revisa los <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">términos de Gemini API</a> y su <a href="https://ai.google.dev/gemini-api/docs/zdr" target="_blank" rel="noopener noreferrer">información de retención</a>.</p>
      <p>No se deben enviar datos sensibles, información confidencial ni datos personales de terceros sin base jurídica y autorización. El contenido puede salir de Colombia y ser procesado en los países donde el proveedor opere infraestructura.</p>
      <h2>Conservación y seguridad</h2><p>La aplicación no cuenta con una base de datos de briefs, feedback ni resultados. La solicitud se procesa en memoria durante la petición; el prefijo de IP usado para limitar abuso también es temporal y en memoria. La pantalla puede mostrar una fecha y una IP anonimizada como log de demostración; ese registro no se guarda ni sirve como comprobante durable de autorización. El proveedor de IA y el alojamiento pueden generar registros sujetos a sus propias políticas.</p>
      <p>La comunicación con la API se realiza por HTTPS y la clave se mantiene del lado del servidor. Ningún sistema ofrece seguridad absoluta; no envíes secretos ni datos que deban permanecer exclusivamente bajo tu control.</p>
      <h2>Derechos</h2><p>Puedes solicitar conocer, actualizar, rectificar o suprimir datos, revocar una autorización y obtener información sobre el uso, escribiendo al correo de contacto. Se responderá conforme a la Ley 1581 de 2012, sus normas reglamentarias y, cuando aplique, el RGPD. Si la respuesta no atiende un reclamo presentado en Colombia, puedes acudir a la Superintendencia de Industria y Comercio después del trámite previo correspondiente.</p>
      <h2>Cookies y analítica</h2><p>La versión actual no instala analítica por defecto. Si se configura Google Analytics, se cargará únicamente después de que el visitante acepte cookies analíticas, y podrá cambiar su elección desde la opción de configuración del sitio.</p>
      <h2>Actualizaciones</h2><p>Los cambios se publicarán en esta página con una nueva fecha de vigencia.</p></>}</LegalDocument>;
}