import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
