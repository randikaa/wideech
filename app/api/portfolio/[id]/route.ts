import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataPath = path.join(process.cwd(), "data", "portfolio.json")

function readPortfolio() {
  try {
    const data = fs.readFileSync(dataPath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function writePortfolio(portfolio: any[]) {
  fs.writeFileSync(dataPath, JSON.stringify(portfolio, null, 2))
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const portfolio = readPortfolio()
    const projectIndex = portfolio.findIndex((p: any) => p.id === Number.parseInt(params.id))

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    portfolio[projectIndex] = { ...portfolio[projectIndex], ...body }
    writePortfolio(portfolio)

    return NextResponse.json(portfolio[projectIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const portfolio = readPortfolio()
    const filteredPortfolio = portfolio.filter((p: any) => p.id !== Number.parseInt(params.id))

    if (portfolio.length === filteredPortfolio.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    writePortfolio(filteredPortfolio)
    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
