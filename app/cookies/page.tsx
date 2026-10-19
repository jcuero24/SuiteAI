import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de Suite IA Comercial.",
};

export default function Page() {
  return <LegalDocument title="Política de cookies">{<><p><strong>Vigencia: 18 de octubre de 2026.</strong></p>
      <p>La versión actual de Suite IA Comercial no instala cookies de publicidad ni herramientas de analítica de forma predeterminada.</p>
      <h2>Almacenamiento necesario</h2><p>La aplicación puede usar almacenamiento local del navegador para recordar una elección de cookies si se habilita analítica opcional. La API usa temporalmente un prefijo de IP en memoria para limitar solicitudes abusivas; no lo conserva en una base de datos.</p>
      <h2>Analítica opcional</h2><p>Si el operador configura un identificador de Google Analytics, el tag no se carga hasta que el visitante seleccione «Aceptar analítica». Rechazarla no impide usar ScopeSnap ni FeedbackDigest. Puedes volver a abrir el panel desde «Configurar cookies». Google recibe datos de navegación conforme a sus propios términos y ajustes.</p>
      <h2>Administrar o borrar</h2><p>Puedes cambiar la decisión con el control de cookies del sitio o borrar el almacenamiento local desde la configuración del navegador. Esto no afecta a los archivos que hayas descargado.</p>
      <p>Contacto: <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>.</p></>}</LegalDocument>;
}