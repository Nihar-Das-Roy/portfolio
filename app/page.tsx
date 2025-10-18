import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Portfolio from "@/components/portfolio"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
