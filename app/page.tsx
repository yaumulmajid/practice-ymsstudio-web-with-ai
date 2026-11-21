import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Pricing from "@/components/pricing"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
