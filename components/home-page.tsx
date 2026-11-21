import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Reviews from "@/components/reviews"
import Pricing from "@/components/pricing"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

/** The landing page; the language comes from the surrounding <LangProvider>. */
export default function HomePage() {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Reviews />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
