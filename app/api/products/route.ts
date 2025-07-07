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

export async function GET() {
  try {
    const products = readProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const products = readProducts()

    const newProduct = {
      id: Date.now(),
      ...body,
      features: body.features || [],
    }

    products.push(newProduct)
    writeProducts(products)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
