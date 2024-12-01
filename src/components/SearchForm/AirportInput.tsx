import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import { searchAirports, getNearbyAirports } from '../../services/api';
import { Airport } from '../../types';
import { MapPin, Search, Loader } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';

interface Props {
  value: string;
  onChange: (value: string, airport?: Airport) => void;
  placeholder: string;
  label: string;
}

export const AirportInput = ({ value, onChange, placeholder, label }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const [debouncedSearch] = useDebounce(search, 300);
  const { latitude, longitude, loading: geoLoading } = useGeolocation();

  const {
    data: searchResults,
    isLoading: searchLoading
  } = useQuery(
    ['airports', debouncedSearch],
    () => searchAirports(debouncedSearch),
    {
      enabled: debouncedSearch.length > 1,
      staleTime: 5 * 60 * 1000,
    }
  );

  const {
    data: nearbyAirports,
    isLoading: nearbyLoading
  } = useQuery(
    ['nearbyAirports', latitude, longitude],
    () => getNearbyAirports(latitude!, longitude!),
    {
      enabled: !!(latitude && longitude),
      staleTime: 30 * 60 * 1000,
    }
  );

  const handleSelect = (airport: Airport) => {
    setSearch(airport.presentation.title);
    onChange(airport.presentation.title, airport);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!value) {
      setSearch('');
    }
  }, [value]);

  const showNearbyAirports = !debouncedSearch && nearbyAirports?.current;
  const showSearchResults = debouncedSearch.length > 1 && searchResults?.length > 0;

  return (
    <div className="relative w-full border rounded-lg border-gray-300 border-opacity-50 hover:border-opacity-70">
      <label className="text-gray-400">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-[#303134] text-white p-3 pl-10 rounded-lg mt-2"
          placeholder={placeholder}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#303134] rounded-lg shadow-lg max-h-96 overflow-auto">
          {(searchLoading || nearbyLoading) && (
            <div className="p-4 text-gray-400 flex items-center">
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Searching airports...
            </div>
          )}

          {showSearchResults && searchResults.map((airport: Airport) => (
            <button
              key={airport.skyId}
              className="w-full text-left p-4 hover:bg-gray-700 flex flex-col"
              onClick={() => handleSelect(airport)}
            >
              <span className="text-white">{airport.presentation.title}</span>
              <span className="text-sm text-gray-400">{airport.presentation.subtitle}</span>
            </button>
          ))}

          {showNearbyAirports && (
            <>
              <div className="p-2 bg-gray-700/50">
                <span className="text-sm text-gray-400 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Nearby airports
                </span>
              </div>
              <button
                className="w-full text-left p-4 hover:bg-gray-700 flex flex-col"
                onClick={() => handleSelect(nearbyAirports.current)}
              >
                <span className="text-white">{nearbyAirports.current.presentation.title}</span>
                <span className="text-sm text-gray-400">{nearbyAirports.current.presentation.subtitle}</span>
              </button>
              {nearbyAirports.nearby?.map((airport: Airport) => (
                <button
                  key={airport.skyId}
                  className="w-full text-left p-4 hover:bg-gray-700 flex flex-col"
                  onClick={() => handleSelect(airport)}
                >
                  <span className="text-white">{airport.presentation.title}</span>
                  <span className="text-sm text-gray-400">{airport.presentation.subtitle}</span>
                </button>
              ))}
            </>
          )}

          {!showSearchResults && !showNearbyAirports && !searchLoading && !nearbyLoading && (
            <div className="p-4 text-gray-400">No airports found</div>
          )}
        </div>
      )}
    </div>
  );
};