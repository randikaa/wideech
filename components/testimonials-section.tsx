"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Rahul Warawitage",
    role: "Actor",
    content: "Wideech transformed our digital presence completely. Their team delivered beyond our expectations with exceptional quality and professionalism.",
    rating: 5,
    image: "https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/rahul.jpg",
  },
  {
    name: "Dilushi hansika",
    role: "Actress",
    content: "Working with Wideech was a game-changer for our project. They understood our vision and brought it to life with incredible attention to detail.",
    rating: 5,
    image: "https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/dilushi.jpg",
  },
  {
    name: "Deegalla Buddhaloka Mawatha",
    role: "Primary School",
    content: "The team at Wideech is simply outstanding. They delivered our mobile app on time and within budget, exceeding all our requirements.",
    rating: 5,
    image: "https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/deegalla.jpg",
  },
  {
    name: "Imeth Weerasingha",
    role: "Co-Founder, KIT Gems",
    content: "Outstanding work from start to finish. The Wideech team demonstrated deep technical expertise and delivered a robust, scalable solution.",
    rating: 5,
    image: "https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/kitgems.jpg",
  },
  {
    name: "Randima Dassa",
    role: "Founder, Salon Randima",
    content: "Highly professional and responsive team. They took our ideas and turned them into a beautiful, functional product that our users love.",
    rating: 5,
    image: "https://cdn.jsdelivr.net/gh/Team-Hologram/wideech/rsalon.png",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, testimonials.length - itemsPerPage) : prev - itemsPerPage))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage)
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial) => (
                <Card key={testimonial.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex + itemsPerPage >= testimonials.length}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
