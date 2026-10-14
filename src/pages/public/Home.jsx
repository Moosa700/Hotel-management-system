import HeroSection from "@/components/common/HeroSection";

import FeaturedRooms from "@/components/home/FeaturedRooms";
import Amenities from "@/components/home/Amenities";
import Statistics from "@/components/home/Statistics";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedRooms />
      <Amenities />
      <Statistics />
      <Gallery />
      <Testimonials />
      <Newsletter />
    </>
  );
}