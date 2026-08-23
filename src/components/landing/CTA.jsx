function CTABanner() {
  return (
    <section className="py-16 px-8 bg-linear-to-r from-blue-600 to-teal-500 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to book your first appointment?
      </h2>
      <p className="text-blue-100 text-lg mb-8">
        Join thousands finding the right doctor, faster.
      </p>
      <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
  );
}

export default CTABanner;