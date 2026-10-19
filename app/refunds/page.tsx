import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Política de reembolsos",
  description: "Política de reembolsos de Suite IA Comercial.",
};

export default function Page() {
  return <LegalDocument title="Política de reembolsos">{<><p><strong>Vigencia: 18 de octubre de 2026.</strong></p>
      <p>ScopeSnap y FeedbackDigest se ofrecen actualmente sin pagos ni compras dentro de la aplicación, por lo que esta versión no genera cargos ni solicita datos de tarjeta.</p>
      <h2>Servicios futuros de pago</h2><p>Antes de habilitar una compra, el proveedor informará el precio total, la duración, la forma de cancelación y las condiciones de retracto, devolución o reembolso que correspondan. La legislación imperativa de protección al consumidor prevalecerá sobre cualquier condición particular.</p>
      <h2>Consultas</h2><p>Para consultas sobre una oferta o un eventual cargo, escribe a <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a> e incluye el comprobante, si existe.</p></>}</LegalDocument>;
}