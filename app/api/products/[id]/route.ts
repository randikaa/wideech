import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataPath = path.join(process.cwd(), "data", "products.json")

function readProducts() {
  try {
    const data = fs.readFileSync(dataPath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function writeProducts(products: any[]) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2))
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const products = readProducts()
    const productIndex = products.findIndex((p: any) => p.id === Number.parseInt(params.id))

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    products[productIndex] = { ...products[productIndex], ...body }
    writeProducts(products)

    return NextResponse.json(products[productIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const products = readProducts()
    const filteredProducts = products.filter((p: any) => p.id !== Number.parseInt(params.id))

    if (products.length === filteredProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    writeProducts(filteredProducts)
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
