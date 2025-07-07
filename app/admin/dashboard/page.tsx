"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, LogOut, Package, Briefcase, Save, X } from "lucide-react"

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

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isPortfolioDialogOpen, setIsPortfolioDialogOpen] = useState(false)

  // Fetch data
  useEffect(() => {
    fetchProducts()
    fetchPortfolio()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      setPortfolio(data)
    } catch (error) {
      console.error("Failed to fetch portfolio:", error)
    }
  }

  const handleProductSubmit = async (formData: FormData) => {
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      type: formData.get("type") as "paid" | "open-source",
      status: formData.get("status") as "active" | "inactive",
      imageUrl: formData.get("imageUrl") as string,
      features: (formData.get("features") as string).split(",").map((f) => f.trim()),
      demoUrl: formData.get("demoUrl") as string,
      purchaseUrl: formData.get("purchaseUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      docsUrl: formData.get("docsUrl") as string,
      stars: Number.parseInt(formData.get("stars") as string) || 0,
      downloads: formData.get("downloads") as string,
    }

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        })
      } else {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        })
      }
      fetchProducts()
      setEditingProduct(null)
      setIsProductDialogOpen(false)
    } catch (error) {
      console.error("Failed to save product:", error)
    }
  }

  const handlePortfolioSubmit = async (formData: FormData) => {
    const portfolioData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      technologies: (formData.get("technologies") as string).split(",").map((t) => t.trim()),
      category: formData.get("category") as string,
      status: formData.get("status") as "published" | "draft",
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      featured: formData.get("featured") === "true",
    }

    try {
      if (editingPortfolio) {
        await fetch(`/api/portfolio/${editingPortfolio.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(portfolioData),
        })
      } else {
        await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(portfolioData),
        })
      }
      fetchPortfolio()
      setEditingPortfolio(null)
      setIsPortfolioDialogOpen(false)
    } catch (error) {
      console.error("Failed to save portfolio:", error)
    }
  }

  const deleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`/api/products/${id}`, { method: "DELETE" })
        fetchProducts()
      } catch (error) {
        console.error("Failed to delete product:", error)
      }
    }
  }

  const deletePortfolio = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await fetch(`/api/portfolio/${id}`, { method: "DELETE" })
        fetchPortfolio()
      } catch (error) {
        console.error("Failed to delete project:", error)
      }
    }
  }

  const handleLogout = () => {
    window.location.href = "/admin"
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {products.filter((p) => p.type === "paid").length} paid,{" "}
                    {products.filter((p) => p.type === "open-source").length} open-source
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Projects</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolio.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {portfolio.filter((p) => p.status === "published").length} published,{" "}
                    {portfolio.filter((p) => p.status === "draft").length} draft
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</div>
                  <p className="text-xs text-muted-foreground">
                    {products.filter((p) => p.status === "inactive").length} inactive
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Featured Projects</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolio.filter((p) => p.featured).length}</div>
                  <p className="text-xs text-muted-foreground">{portfolio.filter((p) => !p.featured).length} regular</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                  <CardDescription>Latest products added to your catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length > 0 ? (
                    <div className="space-y-3">
                      {products
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 5)
                        .map((product) => (
                          <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                  src={product.imageUrl || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={product.type === "paid" ? "default" : "secondary"} className="text-xs">
                                {product.type}
                              </Badge>
                              <Badge variant={product.status === "active" ? "default" : "outline"} className="text-xs">
                                {product.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No products yet</p>
                      <p className="text-sm">Add your first product to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Portfolio</CardTitle>
                  <CardDescription>Latest projects added to your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  {portfolio.length > 0 ? (
                    <div className="space-y-3">
                      {portfolio
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 5)
                        .map((project) => (
                          <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{project.title}</p>
                                <p className="text-xs text-muted-foreground">{project.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={project.status === "published" ? "default" : "outline"}
                                className="text-xs"
                              >
                                {project.status}
                              </Badge>
                              {project.featured && (
                                <Badge variant="secondary" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No projects yet</p>
                      <p className="text-sm">Add your first project to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    onClick={() => {
                      setActiveTab("products")
                      setEditingProduct(null)
                      setIsProductDialogOpen(true)
                    }}
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Add Product</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    onClick={() => {
                      setActiveTab("portfolio")
                      setEditingPortfolio(null)
                      setIsPortfolioDialogOpen(true)
                    }}
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Add Project</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    onClick={() => setActiveTab("products")}
                  >
                    <Package className="h-6 w-6" />
                    <span className="text-sm">Manage Products</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    onClick={() => setActiveTab("portfolio")}
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="text-sm">Manage Portfolio</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingProduct(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                      {editingProduct ? "Update product information" : "Create a new product listing"}
                    </DialogDescription>
                  </DialogHeader>
                  <form action={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" name="name" defaultValue={editingProduct?.name || ""} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Product Type</Label>
                        <Select name="type" defaultValue={editingProduct?.type || "paid"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="open-source">Open Source</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingProduct?.description || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        defaultValue={editingProduct?.imageUrl || ""}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          placeholder="e.g., $99/month or Free"
                          defaultValue={editingProduct?.price || ""}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={editingProduct?.status || "active"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Textarea
                        id="features"
                        name="features"
                        placeholder="Feature 1, Feature 2, Feature 3"
                        defaultValue={editingProduct?.features?.join(", ") || ""}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="demoUrl">Demo URL</Label>
                        <Input id="demoUrl" name="demoUrl" type="url" defaultValue={editingProduct?.demoUrl || ""} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purchaseUrl">Purchase URL</Label>
                        <Input
                          id="purchaseUrl"
                          name="purchaseUrl"
                          type="url"
                          defaultValue={editingProduct?.purchaseUrl || ""}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input
                          id="githubUrl"
                          name="githubUrl"
                          type="url"
                          defaultValue={editingProduct?.githubUrl || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="docsUrl">Documentation URL</Label>
                        <Input id="docsUrl" name="docsUrl" type="url" defaultValue={editingProduct?.docsUrl || ""} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stars">Stars (for open-source)</Label>
                        <Input id="stars" name="stars" type="number" defaultValue={editingProduct?.stars || 0} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="downloads">Downloads (for open-source)</Label>
                        <Input
                          id="downloads"
                          name="downloads"
                          placeholder="e.g., 50K+"
                          defaultValue={editingProduct?.downloads || ""}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {editingProduct ? "Update" : "Create"} Product
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>Manage your paid and open-source products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium">{product.name}</h3>
                          <Badge variant={product.type === "paid" ? "default" : "secondary"}>{product.type}</Badge>
                          <Badge variant="outline">{product.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(product)
                            setIsProductDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Portfolio Management</h2>
              <Dialog open={isPortfolioDialogOpen} onOpenChange={setIsPortfolioDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingPortfolio(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingPortfolio ? "Edit Project" : "Add New Project"}</DialogTitle>
                    <DialogDescription>
                      {editingPortfolio ? "Update project information" : "Add a new project to your portfolio"}
                    </DialogDescription>
                  </DialogHeader>
                  <form action={handlePortfolioSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input id="title" name="title" defaultValue={editingPortfolio?.title || ""} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={editingPortfolio?.category || "Web Development"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                            <SelectItem value="Custom Software">Custom Software</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingPortfolio?.description || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        placeholder="https://example.com/project-image.jpg"
                        defaultValue={editingPortfolio?.imageUrl || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="technologies"
                        name="technologies"
                        placeholder="React, Node.js, MongoDB"
                        defaultValue={editingPortfolio?.technologies?.join(", ") || ""}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={editingPortfolio?.status || "published"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="featured">Featured</Label>
                        <Select name="featured" defaultValue={editingPortfolio?.featured ? "true" : "false"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="liveUrl">Live URL</Label>
                        <Input
                          id="liveUrl"
                          name="liveUrl"
                          type="url"
                          placeholder="https://example.com"
                          defaultValue={editingPortfolio?.liveUrl || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input
                          id="githubUrl"
                          name="githubUrl"
                          type="url"
                          placeholder="https://github.com/username/repo"
                          defaultValue={editingPortfolio?.githubUrl || ""}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {editingPortfolio ? "Update" : "Create"} Project
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsPortfolioDialogOpen(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolio.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium">{project.title}</h3>
                          <Badge variant="secondary">{project.category}</Badge>
                          <Badge variant={project.status === "published" ? "default" : "outline"}>
                            {project.status}
                          </Badge>
                          {project.featured && <Badge>Featured</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingPortfolio(project)
                            setIsPortfolioDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deletePortfolio(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
