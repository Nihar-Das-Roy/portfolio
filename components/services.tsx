"use client"

import { useEffect, useRef, useState } from "react"

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications built with modern technologies and best practices",
    icon: "💻",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces with smooth animations",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Performance Optimization",
    description: "Fast, efficient websites optimized for speed and user experience",
    icon: "⚡",
  },
  {
    id: 4,
    title: "Responsive Design",
    description: "Mobile-first designs that work perfectly on all devices",
    icon: "📱",
  },
  {
    id: 5,
    title: "API Integration",
    description: "Seamless integration with third-party APIs and services",
    icon: "🔗",
  },
  {
    id: 6,
    title: "Maintenance & Support",
    description: "Ongoing support and maintenance for your web applications",
    icon: "🛠️",
  },
]

export default function Services() {
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
    <section id="services" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-balance">Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`p-8 rounded-lg bg-background border border-border hover:border-primary hover:bg-card transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
