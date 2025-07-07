"use client"

import { useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, Users, Award, Rocket } from "lucide-react"

const timelineEvents = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Wideech was established with a vision to revolutionize digital solutions.",
    icon: Rocket,
  },
  {
    year: "2021",
    title: "First Major Client",
    description: "Secured our first enterprise client and delivered a successful project.",
    icon: Users,
  },
  {
    year: "2022",
    title: "Team Expansion",
    description: "Grew our team to 15+ talented developers and designers.",
    icon: Users,
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Received multiple awards for innovation and client satisfaction.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Expanded operations internationally with clients across 3 continents.",
    icon: Calendar,
  },
]

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          // Add staggered animation for timeline items
          if (entry.target.classList.contains("timeline-item")) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setTimeout(() => {
              entry.target.classList.add("slide-in")
            }, index * 200) // 200ms delay between each item
          }
        }
      })
    }, observerOptions)

    // Observe hero elements
    const heroElements = heroRef.current?.querySelectorAll(".hero-element")
    heroElements?.forEach((element) => observer.observe(element))

    // Observe mission elements
    const missionElements = missionRef.current?.querySelectorAll(".mission-element")
    missionElements?.forEach((element) => observer.observe(element))

    // Observe timeline items
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
    timelineItems?.forEach((item, index) => {
      item.setAttribute("data-index", index.toString())
      observer.observe(item)
    })

    // Observe stats elements
    const statsElements = statsRef.current?.querySelectorAll(".stat-item")
    statsElements?.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="container py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="hero-element text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 opacity-0 translate-y-8 transition-all duration-700">
              About Wideech
            </h1>
            <p className="hero-element text-xl text-muted-foreground mb-8 opacity-0 translate-y-8 transition-all duration-700 delay-200">
              We're a passionate team of developers, designers, and innovators at Wideech, dedicated to creating
              exceptional digital experiences that drive business growth.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section ref={missionRef} className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="mission-element space-y-4 opacity-0 translate-x-[-50px] transition-all duration-700">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                To empower businesses with innovative technology solutions that streamline operations, enhance user
                experiences, and drive sustainable growth in the digital age.
              </p>
            </div>
            <div className="mission-element space-y-4 opacity-0 translate-x-[50px] transition-all duration-700 delay-300">
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the leading provider of transformative digital solutions, recognized for our technical excellence,
                creative innovation, and unwavering commitment to client success.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div ref={timelineRef} className="relative">
              {/* Timeline line */}
              <div className="timeline-line absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5 origin-top scale-y-0 transition-transform duration-1000 delay-500"></div>

              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`timeline-item relative flex items-center mb-12 opacity-0 transition-all duration-700 ${
                    index % 2 === 0
                      ? "md:flex-row translate-x-[-100px] md:translate-x-[-50px]"
                      : "md:flex-row-reverse translate-x-[100px] md:translate-x-[50px]"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute left-8 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:-translate-x-1/2 z-10 scale-0 transition-transform duration-500"></div>

                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="timeline-card bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="timeline-icon p-2 bg-primary/10 rounded-lg">
                          <event.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="timeline-year text-2xl font-bold text-primary">{event.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section ref={statsRef} className="bg-muted/50 py-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="stat-item opacity-0 translate-y-8 transition-all duration-700">
                <div className="stat-number text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="stat-item opacity-0 translate-y-8 transition-all duration-700 delay-100">
                <div className="stat-number text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Team Members</div>
              </div>
              <div className="stat-item opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <div className="stat-number text-4xl font-bold text-primary mb-2">5</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="stat-item opacity-0 translate-y-8 transition-all duration-700 delay-300">
                <div className="stat-number text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }

        .slide-in {
          transform: translateY(0) translateX(0) !important;
        }

        .animate-in .timeline-line {
          transform: scaleY(1) !important;
        }

        .animate-in .timeline-dot {
          transform: scale(1) !important;
        }

        .timeline-card:hover .timeline-icon {
          transform: rotate(5deg) scale(1.1);
          transition: transform 0.3s ease;
        }

        .stat-number {
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)) 60%, hsl(var(--accent)));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .timeline-item.animate-in .timeline-card {
          animation: slideInBounce 0.6s ease-out forwards;
        }

        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
