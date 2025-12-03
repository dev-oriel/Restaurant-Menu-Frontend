import React from "react";

const dishes = [
  {
    name: "Smoky Jollof Rice",
    description:
      "Our signature dish, cooked over an open flame for that authentic smoky flavor. Served with succulent grilled chicken.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWJ5ZQ4h6PnXnLsVPaAhkJMNouAb9oKSuwmRL63WUbjfdtkRdpZXw_XCrw2M5FcfXeLqmh9qHd1fj4kZSYT_NXuAIRM8BB3IMN3qBYdu5aV_vMHn2wwAyoq-QX-r5nRufeT33gVNWZAJYLFAFqG2ULzzB8Mb0qU7s89oWqoGSkT1T47_R6Rt66r76qeUmTgGCI-W5_Nxx_pnuZjip2QIXNV2qEGB8b4NcnpA8BpivErqChV_X_Zzif3QPM274g-VaZ0Ps9YAijRlg", // CORRECTED LINK
    alt: "A close-up of a steaming bowl of Jollof Rice with chicken.",
  },
  {
    name: "Spiced Grilled Tilapia",
    description:
      "Fresh Tilapia marinated in a secret blend of African spices and grilled to perfection. A true taste of the coast.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAl0DE9ls65WM_ix0Hjyv6-eEipCmXD5-0oQjTdED7771DrWizbckWqpBOYNV-H-9YrHDGwX-MRsjQdr_r7PikNeA0JLhQdekN4R1QowG49hCRYaP29QuWz5Ee1ANC9ZYlkSaik7MzGGiXmxdcr6Gpq0tvVuN1wkWaAonMEuCtgc8rowVhETFxRJVz9WQb6Um7EXAQ3bNHr1Fjf9yrjcB2Xvl_99JAQC1g4g9S0JUChn7PyoFJjnRxA4grlQjlJiA4xCmsJNyRYXOs", // CORRECTED LINK
    alt: "Grilled Tilapia served with a side of fried plantains and spicy sauce.",
  },
  {
    name: "Hearty Egusi Soup",
    description:
      "A rich and savory soup made with melon seeds and leafy greens, served with your choice of swallow.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFcrEupzfo9yaWYHgIx5AFLeoXE2-qpJgPA8-BmhmvLb4-uceUP5he3-ZM0Eukc5IA_X-X8TL_x9tm6IncdzMVlRBN8zh1hP4XfDjFKPASfherxSmA0pLju7uwm26CcIBpbu2VsSc_037GwXfNaTI6gwKGmtINyfPey70Bm-gEjeO1Xy9-tGPigVZW2ONwhsUwp_yq9kpJHRd9DfxBeVKRl0E7I3COld9wQp4FRagE1Ni3MREqmzO8rYVJof0qF5dEo-3RkV52wZg", // CORRECTED LINK
    alt: "A vibrant plate of Egusi soup with pounded yam.",
  },
];

const FeaturedDishes = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-neutral-900 dark:text-neutral-50 text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5 text-center">
        Featured Dishes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden shadow-lg pb-4"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover shadow-md"
              data-alt={dish.alt}
              style={{ backgroundImage: `url("${dish.image}")` }}
            ></div>
            <div className="flex flex-col gap-1 px-4">
              <p className="text-neutral-900 dark:text-neutral-50 text-lg font-bold leading-tight">
                {dish.name}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-normal leading-normal">
                {dish.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDishes;
