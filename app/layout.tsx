import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import MouseMoveEffect from "@/components/mouse-move-effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wideech - Digital Solutions & Software Development",
  description:
    "Professional software development, web design, and digital solutions. Custom applications, mobile apps, and innovative technology services by Wideech.",
  icons:{
    icon :"/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MouseMoveEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
