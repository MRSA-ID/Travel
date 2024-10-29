const Hero = () => {
  return (
    <section className="flex justify-center items-center bg-white px-4 py-5">
      {/* content text */}

      <div className="h-[800px] relative w-full rounded-lg overflow-hidden">
        <div className="z-20 text-center relative h-full grid px-1.5 md:grid-cols-2 md:text-start md:pl-4 md:px-0 xl:pl-24 bg-black/25 hover:backdrop-blur-sm duration-300 transition-all">
          <h1 className="font-Syne font-bold self-end text-7xl md:col-span-2 lg:text-9xl text-white tracking-tight !leading-[0.85]">
            Discover the <br />
            World’s Wonders
          </h1>
          <span className="font-Syne font-medium text-3xl text-white">
            Your Guide to Inspiring Travel Adventures <br />
            <span className="text-base text-white">- Article Travel Apps-</span>
          </span>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 ">
          <img
            src="/image/hero_image.jpg"
            className="w-full h-full object-cover"
            alt="hero_image_full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
