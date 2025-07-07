"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Download } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: string
  type: "paid" | "open-source"
  status: "active" | "inactive"
  imageUrl: string
  features: string[]
  demoUrl?: string
  purchaseUrl?: string
  githubUrl?: string
  docsUrl?: string
  stars?: number
  downloads?: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data.filter((p: Product) => p.status === "active"))
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const paidProducts = products.filter((p) => p.type === "paid")
  const openSourceProducts = products.filter((p) => p.type === "open-source")

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Our Products</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our range of premium software solutions and open-source tools designed to accelerate your
              development process.
            </p>
          </div>
        </section>

        {/* Paid Products */}
        {paidProducts.length > 0 && (
          <section className="container py-16">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Premium Products</h2>
              <p className="text-muted-foreground">
                Professional-grade solutions with dedicated support and advanced features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paidProducts.map((product) => (
                <Card key={product.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <Badge variant="secondary">Premium</Badge>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
                      <div className="flex gap-2">
                        {product.purchaseUrl && (
                          <Button asChild className="flex-1">
                            <a href={product.purchaseUrl}>Purchase</a>
                          </Button>
                        )}
                        {product.demoUrl && (
                          <Button variant="outline" asChild>
                            <a href={product.demoUrl}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Open Source Products */}
        {openSourceProducts.length > 0 && (
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Open Source</h2>
                <p className="text-muted-foreground">
                  Free and open-source tools that you can use, modify, and contribute to.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {openSourceProducts.map((product) => (
                  <Card key={product.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge variant="outline">Open Source</Badge>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {(product.stars || product.downloads) && (
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          {product.stars && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1" />
                              {product.stars}
                            </div>
                          )}
                          {product.downloads && (
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              {product.downloads}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-center text-sm">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex gap-2">
                        {product.githubUrl && (
                          <Button asChild className="flex-1">
                            <a href={product.githubUrl}>
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {product.docsUrl && (
                          <Button variant="outline" asChild>
                            <a href={product.docsUrl}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Docs
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
