import React from "react";


const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-neutral-900 dark:text-neutral-50 text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5 text-center">
        What Our Customers Say
      </h2>
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-8 md:p-10 shadow-lg">
          <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
            <div className="flex text-amber-600">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined fill-1">
                  star
                </span>
              ))}
            </div>
            <p className="text-neutral-900 dark:text-neutral-50 text-lg italic leading-relaxed">
              "An incredible dining experience! The food was bursting with
              flavor, and the atmosphere was so welcoming. It felt like a trip
              to Africa without leaving the city. We will definitely be back!"
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-bold uppercase tracking-wider">
              - Adeola Johnson
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
