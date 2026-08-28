function FAQ() {
  const faqs = [
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel or downgrade your plan anytime with no extra charges."
    },
    {
      q: "Is there a free trial for Professional plan?",
      a: "Yes, new doctors get a 14-day free trial before being charged."
    },
    {
      q: "Do patients have to pay anything?",
      a: "No, booking an appointment is always free for patients."
    },
    {
      q: "Can I switch plans later?",
      a: "Absolutely — you can upgrade or downgrade your plan at any time from your dashboard."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-20 px-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
            <p className="text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;