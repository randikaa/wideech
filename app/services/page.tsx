"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Globe, Database, Shield, Zap } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    basePrice: 2000,
    features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "CMS Integration"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    basePrice: 5000,
    features: ["Cross-platform", "Native Performance", "App Store Deployment", "Push Notifications"],
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions for specific business requirements",
    basePrice: 8000,
    features: ["Custom Architecture", "Scalable Solutions", "API Integration", "Maintenance Support"],
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Database design, optimization, and management services",
    basePrice: 1500,
    features: ["Database Design", "Performance Tuning", "Data Migration", "Backup Solutions"],
  },
  {
    icon: Shield,
    title: "Security Consulting",
    description: "Comprehensive security audits and implementation services",
    basePrice: 3000,
    features: ["Security Audits", "Penetration Testing", "Compliance", "Security Training"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user experience",
    basePrice: 1000,
    features: ["Code Optimization", "Caching Strategies", "CDN Setup", "Monitoring"],
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState("")
  const [projectSize, setProjectSize] = useState("")
  const [timeline, setTimeline] = useState("")
  const [estimatedCost, setEstimatedCost] = useState(0)

  const calculateCost = () => {
    const service = services.find((s) => s.title === selectedService)
    if (!service) return

    let cost = service.basePrice

    // Adjust based on project size
    if (projectSize === "small") cost *= 0.7
    else if (projectSize === "large") cost *= 1.5
    else if (projectSize === "enterprise") cost *= 2.5

    // Adjust based on timeline
    if (timeline === "rush") cost *= 1.5
    else if (timeline === "flexible") cost *= 0.9

    setEstimatedCost(Math.round(cost))
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive digital solutions tailored to your business needs. From web development to mobile apps,
              we've got you covered.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="h-full">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">Key Features:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-lg font-semibold">Starting from ${service.basePrice.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Price Calculator */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold text-center mb-8">Project Cost Calculator</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Get an Estimate</CardTitle>
                  <CardDescription>Select your requirements to get a rough estimate for your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Type</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.title} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Project Size</Label>
                    <Select value={projectSize} onValueChange={setProjectSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (Basic features)</SelectItem>
                        <SelectItem value="medium">Medium (Standard features)</SelectItem>
                        <SelectItem value="large">Large (Advanced features)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (Complex requirements)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible (3+ months)</SelectItem>
                        <SelectItem value="standard">Standard (1-3 months)</SelectItem>
                        <SelectItem value="rush">Rush (Less than 1 month)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={calculateCost}
                    className="w-full"
                    disabled={!selectedService || !projectSize || !timeline}
                  >
                    Calculate Estimate
                  </Button>

                  {estimatedCost > 0 && (
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Project Cost</p>
                      <p className="text-3xl font-bold text-primary">${estimatedCost.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        *This is a rough estimate. Final pricing may vary based on specific requirements.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
