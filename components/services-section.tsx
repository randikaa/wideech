import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Globe, Database, Shield, Zap } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions for specific business requirements",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Database design, optimization, and management services",
  },
  {
    icon: Shield,
    title: "Security Consulting",
    description: "Comprehensive security audits and implementation services",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user experience",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
