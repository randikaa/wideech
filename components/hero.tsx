import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Zap, Users } from "lucide-react"

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center">
      <div className="space-y-6">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Streamline Your
          <br />
          Digital Future
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 font-myfont">
          Wideech creates innovative software solutions, stunning web experiences, and powerful digital products that
          drive your business forward in the modern world.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <a href="/contact">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="/portfolio">View Our Work</a>
        </Button>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
        <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border bg-card">
          <Code className="h-8 w-8 text-primary" />
          <h3 className="font-semibold">Custom Development</h3>
          <p className="text-sm text-muted-foreground text-center">
            Tailored solutions built with cutting-edge technologies
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border bg-card">
          <Zap className="h-8 w-8 text-primary" />
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="text-sm text-muted-foreground text-center">
            Rapid development cycles without compromising quality
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border bg-card">
          <Users className="h-8 w-8 text-primary" />
          <h3 className="font-semibold">Expert Team</h3>
          <p className="text-sm text-muted-foreground text-center">
            Experienced professionals dedicated to your success
          </p>
        </div>
      </div>
    </section>
  )
}
