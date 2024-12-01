import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How can I find last-minute flight deals?',
    answer: 'Check our last-minute deals section, be flexible with your travel dates, and sign up for price alerts to catch the best deals.'
  },
  {
    question: 'How can I find cheap flights for a weekend getaway?',
    answer: 'Use our weekend deals filter, compare prices across different dates, and book in advance for the best rates.'
  },
  {
    question: 'How can I find flight deals if my travel plans are flexible?',
    answer: 'Use our flexible dates feature to see prices across different days and find the best deals for your trip.'
  },
  {
    question: 'How can I find cheap flights to anywhere?',
    answer: 'Use our Explore feature to discover destinations within your budget and compare prices across different locations.'
  },
  {
    question: 'How can I get flight alerts for my trip?',
    answer: "Set up price alerts for your desired route and we'll notify you when prices change or deals become available."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6 text-white">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-700"
          >
            <button
              className="w-full py-4 flex items-center justify-between text-white"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-left">{faq.question}</span>
              <ChevronDown className={`h-5 w-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <p className="pb-4 text-gray-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};