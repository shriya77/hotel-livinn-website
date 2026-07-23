import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stay } from "@/components/Stay";
import { Rooms } from "@/components/Rooms";
import { Amenities } from "@/components/Amenities";
import { Gallery } from "@/components/Gallery";
import { Policies } from "@/components/Policies";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stay />
        <Rooms />
        <Amenities />
        <Gallery />
        <Policies />
        <Booking />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
