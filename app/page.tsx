import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { LogoStrip } from "@/components/landing/logo-strip";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { ProductSection } from "@/components/landing/product-section";
import { InquirySection } from "@/components/landing/inquiry-section";
import { HowItWorks } from "@/components/landing/how-it-works";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <LogoStrip />
        <FeatureGrid />
        <ProductSection />
        <InquirySection />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
