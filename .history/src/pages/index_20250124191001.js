import Head from "next/head";
import { Navbar } from "@/components/layout/Navbar";
import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/layout/Footer";
import { RevealLinks } from "@/components/layout/HeroSection";
import { DragCards } from "@/components/Card";
export default function Home() {
  return (
    <div>
      <Head>
        <title>SewaLapang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/faviconlogo.png" />
      </Head>
      <div>
        <Navbar />
        <DragCards />
        <RevealLinks />
        <MainLayout />
        <Footer />
      </div>
    </div>
  );
}
