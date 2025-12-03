import React from "react";


const features = [
  {
    icon: "local_florist",
    title: "Authentic Flavors",
    description:
      "We use traditional recipes passed down through generations to bring you a truly authentic taste.",
  },
  {
    icon: "eco",
    title: "Locally Sourced",
    description:
      "Our commitment to quality means we source the freshest ingredients from local farms and markets.",
  },
  {
    icon: "celebration",
    title: "Unforgettable Ambiance",
    description:
      "Experience a warm, contemporary setting that combines modern design with African art and culture.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-8 md:p-12 shadow-inner">
        <h2 className="text-neutral-900 dark:text-neutral-50 text-3xl font-bold leading-tight tracking-[-0.015em] pb-8 text-center">
          Why Dine With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center size-12 rounded-full bg-amber-600/20 dark:bg-amber-600/30 text-amber-600">
                <span className="material-symbols-outlined">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-neutral-900 dark:text-neutral-50 text-lg font-bold">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
