"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/ecommerce-platform.jpg",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: "/task-management-app.jpg",
    tags: ["Next.js", "TypeScript", "Firebase"],
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Interactive dashboard with data visualization",
    image: "/analytics-dashboard.png",
    tags: ["React", "D3.js", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Social Media App",
    description: "Social platform with messaging and notifications",
    image: "/social-media-app.jpg",
    tags: ["Next.js", "PostgreSQL", "WebSocket"],
  },
]

export default function Portfolio() {
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
    <section id="portfolio" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-balance">Portfolio</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium border border-primary/30 hover:border-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
