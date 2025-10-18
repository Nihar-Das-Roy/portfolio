"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
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
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-balance">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/nihar-das-roy.png"
                  alt="Nihar Das Roy - Professional Web Developer"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm Nihar Das Roy, a professional web developer with a passion for creating beautiful, functional, and
              animated digital experiences. With expertise in modern web technologies, I transform ideas into reality.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              My journey in web development has equipped me with skills in React, Next.js, TypeScript, and Tailwind CSS.
              I believe in writing clean, maintainable code and delivering exceptional user experiences through smooth
              animations and intuitive interfaces.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "JavaScript",
                  "Web Animation",
                  "UI/UX Design",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 hover:border-primary transition-all duration-300 transform hover:scale-105"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-primary/20 space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Email:</span> nihardasroy8@gmail.com
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Phone:</span> +880 1736726537
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/nihar-das-roy-532859365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors duration-300"
                >
                  linkedin.com/in/nihar-das-roy-532859365
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
