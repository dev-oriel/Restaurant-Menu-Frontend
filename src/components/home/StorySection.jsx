import React from "react";

const StorySection = () => {
  // CORRECTED LINK: Matching original HTML
  const storyImageUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAVeOEXk7WggNt_WSe5_muzJoXJcC1Y-EuqagMkT4aY4mrX0IhJKA5s4kuRk57BuKB0t7HPKRga-P32vv1Eb3Bf_dqrSiDCWMTlgAMCHZdQIrzuki_xxVIdldggL1GBlzTQhK-HDc81KsH29DmoZeTlWgorEtDwxZUF2eHixsiXNqufaDiS2AuwgoHyMrrI_AW-d2utp_MRO2J-kwYqBpQAsMjMMPJuGAoKqiN5GpHnNno399Iz5scD2AWEUMP7u-5F0kuK27B0SPA";

  return (
    <section id="story" className="max-w-7xl mx-auto">
      <h2 className="text-neutral-900 dark:text-neutral-50 text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5 text-center">
        Our Story
      </h2>
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-6 md:p-8 shadow-lg">
          <div className="flex flex-[1_1_0px] flex-col gap-4 justify-center">
            <div className="flex flex-col gap-2">
              <p className="text-neutral-900 dark:text-neutral-50 text-xl font-bold leading-tight">
                From Our Hearth to Your Heart
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal leading-relaxed">
                Founded on a passion for rich culinary heritage, FLEVANEST
                EATERIES is a celebration of authentic African cuisine,
                reimagined for the modern palate. We believe in fresh,
                locally-sourced ingredients and time-honored recipes that tell a
                story with every bite.
              </p>
            </div>
            <a
              href="#footer-contact"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-row-reverse bg-amber-600/20 dark:bg-amber-600/30 text-neutral-900 dark:text-neutral-50 text-sm font-medium leading-normal w-fit hover:bg-amber-600/30 dark:hover:bg-amber-600/40 transition-colors"
            >
              <span className="truncate">Learn More</span>
            </a>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 min-h-[250px] shadow-md"
            data-alt="Warm and inviting interior of the Flevanest Eateries restaurant, showing wooden tables and ambient lighting."
            style={{ backgroundImage: `url("${storyImageUrl}")` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
