"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "CEO, Tech Startup",
    content:
      "Nihar delivered an exceptional website that exceeded our expectations. His attention to detail and animation skills are outstanding.",
    image: "/professional-headshot.jpg",
  },
  {
    id: 2,
    name: "Fatima Khan",
    role: "Product Manager, Digital Agency",
    content:
      "Working with Nihar was a pleasure. He understood our vision and created a beautiful, functional platform that our users love.",
    image: "/professional-headshot.jpg",
  },
  {
    id: 3,
    name: "Rajesh Patel",
    role: "Founder, E-Commerce Business",
    content:
      "The performance improvements and animations Nihar implemented have significantly increased our conversion rates.",
    image: "/professional-headshot.jpg",
  },
]

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-balance">Testimonials</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`p-8 rounded-lg bg-card border border-border hover:border-primary transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-primary/30 group-hover:border-primary transition-colors"
                />
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-muted-foreground italic leading-relaxed">"{testimonial.content}"</p>

              <div className="flex mt-4 text-primary gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg hover:scale-125 transition-transform duration-300">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
