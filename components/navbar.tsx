"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </div>
            <span className="font-bold text-xl">Wideech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/portfolio" className="transition-colors hover:text-primary">
              Portfolio
            </Link>
            <Link href="/services" className="transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="/products" className="transition-colors hover:text-primary">
              Products
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative z-50">
              <div className="relative w-5 h-5">
                <Menu
                  className={`h-5 w-5 absolute transition-all duration-300 ${
                    isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`h-5 w-5 absolute transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Sliding Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-xl">Wideech</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-6 space-y-1">
            <Link
              href="/"
              className="flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted hover:text-primary group"
              onClick={() => setIsOpen(false)}
            >
              <span className="transform transition-transform group-hover:translate-x-1">Home</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted hover:text-primary group"
              onClick={() => setIsOpen(false)}
            >
              <span className="transform transition-transform group-hover:translate-x-1">About</span>
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted hover:text-primary group"
              onClick={() => setIsOpen(false)}
            >
              <span className="transform transition-transform group-hover:translate-x-1">Portfolio</span>
            </Link>
            <Link
              href="/services"
              className="flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted hover:text-primary group"
              onClick={() => setIsOpen(false)}
            >
              <span className="transform transition-transform group-hover:translate-x-1">Services</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted hover:text-primary group"
              onClick={() => setIsOpen(false)}
            >
              <span className="transform transition-transform group-hover:translate-x-1">Products</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted hover:text-primary group"
              onClick={() => setIsOpen(false)}
            >
              <span className="transform transition-transform group-hover:translate-x-1">Contact</span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="p-6 border-t mt-auto">
            <Button asChild className="w-full">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <div className="p-6 text-center text-xs text-muted-foreground border-t">
            <p>&copy; 2025 Wideech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}
