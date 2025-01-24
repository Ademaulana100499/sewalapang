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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Contrail+One&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/faviconlogo.png" />
      </Head>
      <div className="font-contrail">
        <Navbar />
        <DragCards />
        <RevealLinks />

        <MainLayout />
        <Footer />
      </div>
    </div>
  );
}
