import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
    return (
        <section className="container py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            About Wideech
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            We're a passionate team of developers, designers, and innovators at Wideech,
                            dedicated to creating exceptional digital experiences that drive business growth.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                                <p className="text-muted-foreground">
                                    To empower businesses with innovative technology solutions that streamline
                                    operations, enhance user experiences, and drive sustainable growth in the digital age.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                                <p className="text-muted-foreground">
                                    To be the leading provider of transformative digital solutions, recognized
                                    for our technical excellence, creative innovation, and unwavering commitment
                                    to client success.
                                </p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href="/about">Learn More About Us</Link>
                        </Button>
                    </div>

                    {/* Right side - Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold text-primary mb-2">50+</div>
                            <div className="text-sm text-muted-foreground">Projects Completed</div>
                        </div>
                        <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold text-primary mb-2">15+</div>
                            <div className="text-sm text-muted-foreground">Team Members</div>
                        </div>
                        <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold text-primary mb-2">5</div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                        </div>
                        <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold text-primary mb-2">98%</div>
                            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
