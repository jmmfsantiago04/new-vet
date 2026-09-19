import { ServicesHero } from "@/components/services/ServicesHero"
import { ServicesSection } from "@/components/services/ServicesSection"
import { ConditionsSection } from "@/components/services/ConditionsSection"
import { CTAServices } from "@/components/services/CTAServices"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Serviços | VetPay",
    description: "Conheça nossos serviços veterinários online e escolha o melhor para o seu pet.",
}

export default function ServicesPage() {
    return (
        <div className="flex flex-col">
            <ServicesHero />
            <ServicesSection />
            <ConditionsSection />
            <CTAServices />
        </div>
    )
} 