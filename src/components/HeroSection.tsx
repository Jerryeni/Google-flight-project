import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { SearchForm } from "./SearchForm/index";
import { SearchParams } from "../types";
import { searchFlights } from "../services/api";

export const HeroSection = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); 
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    console.log("Search initiated with:", params);

    try {
      setLoading(true);
      setError(null);

      // Call the `searchFlights` API function
      const flights = await searchFlights({
        originSkyId: params.from,
        destinationSkyId: params.to,
        originEntityId: params.from,
        destinationEntityId: params.to,
        date: params.departureDate.toISOString().split("T")[0],
        returnDate: undefined,
      });

      setResults(flights || []); 
      console.log("Fetched flights:", flights);
    } catch (err) {
      console.error("Error during search:", err);
      setError("Failed to fetch flights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#202124] via-transparent to-[#202124]" />
        <div className="relative h-full">
          <div className="absolute inset-0">
            <svg className="h-full w-full" viewBox="0 0 1440 400">
              <path
                fill="#3c4043"
                d="M0 300 L100 250 L200 280 L300 260 L400 300 L500 250 L600 280 L700 240 L800 260 L900 220 L1000 240 L1100 200 L1200 240 L1300 200 L1400 220 L1440 200 V400 H0 Z"
              />
              <path
                fill="#202124"
                d="M0 320 L100 270 L200 300 L300 280 L400 320 L500 270 L600 300 L700 260 L800 280 L900 240 L1000 260 L1100 220 L1200 260 L1300 220 L1400 240 L1440 220 V400 H0 Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative pt-16 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-normal text-white mb-4">Flights</h1>
        </div>

        {/* Search Form Container */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#9aa0a6] bg-opacity-10 rounded-xl py-4 px-4 shadow-lg">
            {/* SearchForm Integration */}
            <SearchForm onSearch={handleSearch} />

            {/* Loading Indicator */}
            {loading && (
              <p className="text-white text-center mt-4">
                Searching for flights...
              </p>
            )}

            {/* Results Display */}
            {results.length > 0 && (
              <div className="mt-6 bg-[#202124] rounded-lg p-4">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Available Flights:
                </h2>
                <ul className="space-y-2">
                  {results.map((flight: any, index) => (
                    <li key={index} className="text-white">
                      {flight.airline} - {flight.origin} to {flight.destination} on{" "}
                      {flight.date}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};