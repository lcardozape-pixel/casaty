import { AgentsContent } from "@/components/agents/AgentsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentes Inmobiliarios en Piura | Equipo Casaty",
  description: "Conoce a nuestros asesores inmobiliarios expertos en Piura. Profesionales verificados para ayudarte a comprar, vender o alquilar con total seguridad.",
  alternates: {
    canonical: "https://casaty.pe/agente",
  },
};

export default function AgentesPage() {
  return <AgentsContent />;
}
