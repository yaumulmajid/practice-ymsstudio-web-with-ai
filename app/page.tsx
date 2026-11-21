import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Projects from "@/components/projects"
import Pricing from "@/components/pricing"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
