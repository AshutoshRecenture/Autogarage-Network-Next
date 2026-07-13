import React from 'react';

const SeoHero = () => {
  return (
    <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/slide-1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center text-white">
        
        {/* Top Text */}
        <p className="text-lg md:text-xl font-light mb-8 max-w-4xl mx-auto leading-relaxed">
          We are, without any question, <span className="text-blue-500 font-bold">The UK's number 1 SEO provider</span> for anything to do with Tyres and the Automotive Industry...
        </p>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
          Don't just rely on our word for it. <br className="hidden md:block" />
          You can test our client rankings for yourself too
        </h1>

        {/* Sub Text */}
        <p className="text-sm md:text-base text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12">
          Perform any of the following Google searches with our highly researched 'search terms' and you will notice a minimum of one of our client's website within the top three positions of the first Google search page........We have plenty more examples to showcase our portfolio
        </p>
      </div>
    </div>
  );
};

export default SeoHero;
