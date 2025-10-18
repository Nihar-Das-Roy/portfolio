"use client"

import { useEffect, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
              Nihar Das Roy
            </h3>
            <p className="text-muted-foreground">Professional Web Developer</p>
          </div>

          <div
            className={`transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Portfolio", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h4 className="font-semibold text-foreground mb-4">Social</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/nihar-das-roy-532859365/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Nihar Das Roy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
