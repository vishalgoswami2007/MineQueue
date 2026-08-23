import heroIllustration from '../../assets/hero-illustration.png';

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-12 md:px-16 py-16 md:py-24 bg-white">
      
      {/* Left Side - Text */}
      <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Book a doctor. <span className="text-blue-600">Skip the wait.</span>
        </h1>

        <p className="text-lg text-gray-600 mt-6 max-w-md mx-auto md:mx-0">
          Find trusted doctors near you and book your appointment in seconds — 
          no calls, no confusion, just a slot that's truly yours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Find a Doctor
          </button>
          <button className="px-6 py-3 border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition">
            Join as a Doctor
          </button>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="flex-1 flex justify-center">
        <img 
          src={heroIllustration}
          alt="Doctor appointment illustration" 
          className="w-full max-w-md"
        />
      </div>

    </section>
  );
}

export default Hero;