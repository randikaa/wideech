"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface Portfolio {
  id: number
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  category: string
  status: "published" | "draft"
  liveUrl: string
  githubUrl: string
  featured: boolean
}

interface UpcomingProject {
  id: number
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  category: string
  expectedDate: string
}

const upcomingProjects: UpcomingProject[] = [
  {
    id: 1,
    title: "Raveen Tharuka's Portfolio",
    description: "Raveen Tharuka's personal website – a vibrant hub showcasing his singing and social‑media presence.",
    imageUrl: "https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/raveen.jpg",
    technologies: ["NextJS", "EMailJS", "Tailwind"],
    category: "Web Development",
    expectedDate: "Q4 2025",
  },
  {
    id: 2,
    title: "King Lotuss's Portfolio",
    description: "King Lotuss's personal website – a vibrant hub showcasing his rapping and social‑media presence.",
    imageUrl: "/https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/lota.png",
    technologies: ["NextJS", "EMailJS", "Tailwind"],
    category: "Web Development",
    expectedDate: "Q4 2025",
  },
]

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      setPortfolio(data.filter((p: Portfolio) => p.status === "published"))
    } catch (error) {
      console.error("Failed to fetch portfolio:", error)
    }
  }

  const categories = ["All", ...Array.from(new Set(portfolio.map((p) => p.category)))]
  const filteredPortfolio =
    selectedCategory === "All" ? portfolio : portfolio.filter((p) => p.category === selectedCategory)

  const featuredProjects = portfolio.filter((p) => p.featured)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Our Portfolio</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our collection of successful projects and see how we've helped businesses achieve their digital
              goals.
            </p>
          </div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="container py-16">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{project.category}</Badge>
                      <Badge>Featured</Badge>
                    </div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Projects */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden h-full flex flex-col">
                <div className="aspect-video bg-muted overflow-hidden relative">
                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-75"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Badge className="text-sm">Coming Soon</Badge>
                  </div>
                </div>
                <CardHeader className="flex-1">
                  <Badge variant="secondary" className="w-fit">
                    {project.category}
                  </Badge>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Expected: {project.expectedDate}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">All Projects</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((project) => (
                <Card key={project.id} className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <Badge variant="secondary" className="w-fit">
                      {project.category}
                    </Badge>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button size="sm" asChild className="flex-1">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
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
      </main>
      <Footer />
    </div>
  )
}
