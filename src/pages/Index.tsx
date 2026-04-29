import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Offers } from "@/components/site/Offers";
import { Categories } from "@/components/site/Categories";
import { Products } from "@/components/site/Products";
import { Farms } from "@/components/site/Farms";
import { Refer } from "@/components/site/Refer";
import { Delivery } from "@/components/site/Delivery";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBar />
      <Offers />
      <Categories />
      <Products />
      <Farms />
      <Refer />
      <Delivery />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
