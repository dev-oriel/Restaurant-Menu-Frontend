import React from "react";
// IMPORTING FROM THE NEW COMPONENTS/HOME DIRECTORY
import HeroSection from "../../components/home/HeroSection.jsx";
import StorySection from "../../components/home/StorySection.jsx";
import FeaturedDishes from "../../components/home/FeaturedDishes.jsx";
import WhyUsSection from "../../components/home/WhyUsSection.jsx";
import Testimonial from "../../components/home/Testimonial.jsx";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 py-10 md:py-16">
      <HeroSection />
      <StorySection />
      <FeaturedDishes />
      <WhyUsSection />
      <Testimonial />
    </div>
  );
};

export default Home;
