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

export async function GET() {
  try {
    const portfolio = readPortfolio()
    return NextResponse.json(portfolio)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const portfolio = readPortfolio()

    const newProject = {
      id: Date.now(),
      ...body,
      technologies: body.technologies || [],
    }

    portfolio.push(newProject)
    writePortfolio(portfolio)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
