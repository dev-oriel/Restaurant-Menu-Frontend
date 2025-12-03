import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroImageUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCO66p9Pn4w-19IskXG_WFRp59LY_A6FlZgF_CpVabQYSA0NaOi38d1kofCfK52ZBqgjEe76K3olc_XWWjiiTguzMu0E8U3mNI8IWYaXtfOstWyk8UUArCqYWfdNi08SbvBfENbTJsTGiOy3tQxqAU2oqw6DJAHSNOj5yJZTRpMs0NBmj6_1OmMtgATqHaTuWx33t4mjMw-tibya0brOX3pRk1QG6vJ3EN99qqPuvwC9bLsisgcwWsiLKHelB0her6vZGd2iF8UHx0";

  return (
    // Outer section defines max width and horizontal padding (px-*)
    <section className="w-full  mx-auto px-4 md:px-8 lg:px-12 @container">
      {/* The main image container (div 1 from original HTML) */}
      <div
        className="flex min-h-[480px] lg:min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 shadow-xl w-full 
        bg-neutral-900 dark:bg-neutral-900" // FIX: Added dark fallback background color to ensure text visibility
        data-alt="A beautifully plated African dish with vibrant colors on a dark table setting."
        style={{
          // The linear gradient darkens the area for better text contrast.
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("${heroImageUrl}")`,
        }}
      >
        <div className="flex flex-col gap-4 text-center max-w-2xl">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl lg:text-6xl">
            Experience Authentic Flavors, Modernly Crafted
          </h1>
          <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg">
            A culinary journey where tradition meets contemporary elegance.
            Discover the soul of Africa on your plate.
          </h2>
        </div>
        <Link
          to="/menu"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 @[480px]:h-12 @[480px]:px-6 bg-amber-600 text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base hover:bg-amber-700 transition-colors shadow-lg"
        >
          <span className="truncate">View Menu</span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
