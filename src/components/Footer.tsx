import { Globe, MapPin, DollarSign } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 text-blue-400 hover:bg-gray-700">
            <Globe className="h-5 w-5" />
            <span>Language · English (United States)</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 text-blue-400 hover:bg-gray-700">
            <MapPin className="h-5 w-5" />
            <span>Location · Nigeria</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 text-blue-400 hover:bg-gray-700">
            <DollarSign className="h-5 w-5" />
            <span>Currency · NGN</span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p className="mb-4">
            Current language and currency options applied: English (United States) - Nigeria - NGN
            <br />
            Displayed currencies may differ from the currencies used to purchase flights.
            <a href="#" className="text-blue-400 ml-1">Learn more</a>
          </p>

          <nav className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#" className="text-blue-400 hover:underline">About</a>
            <a href="#" className="text-blue-400 hover:underline">Privacy</a>
            <a href="#" className="text-blue-400 hover:underline">Terms</a>
            <a href="#" className="text-blue-400 hover:underline">Join user studies</a>
            <a href="#" className="text-blue-400 hover:underline">Feedback</a>
            <a href="#" className="text-blue-400 hover:underline">Help Center</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};