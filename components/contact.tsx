"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-balance">Get In Touch</h2>

        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg hover:shadow-xl hover:shadow-primary/50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 animate-fade-in-up">
                Message sent successfully! I'll get back to you soon at your email.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 animate-fade-in-up">
                Error sending message. Please try again.
              </div>
            )}
          </form>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-6 text-foreground">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center group cursor-pointer">
                <span className="text-primary mr-4 text-xl group-hover:scale-125 transition-transform">📧</span>
                <a
                  href="mailto:nihardasroy8@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  nihardasroy8@gmail.com
                </a>
              </div>
              <div className="flex items-center group cursor-pointer">
                <span className="text-primary mr-4 text-xl group-hover:scale-125 transition-transform">📱</span>
                <a
                  href="tel:+8801736726537"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  +880 1736726537
                </a>
              </div>
              <div className="flex items-center group cursor-pointer">
                <span className="text-primary mr-4 text-xl group-hover:scale-125 transition-transform">💼</span>
                <a
                  href="https://www.linkedin.com/in/nihar-das-roy-532859365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
