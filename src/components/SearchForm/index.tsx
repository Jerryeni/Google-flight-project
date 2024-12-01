import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ArrowLeftRight } from 'lucide-react';
import { SearchParams } from '../../types';
import { PassengersSelect } from './PassengersSelect';
import { AirportInput } from './AirportInput';
import { format } from 'date-fns';
import { searchFlights } from '../../services/api';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onSearch: (params: SearchParams) => void;
}

export const SearchForm = ({ onSearch }: Props) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    departureDate: new Date(),
    returnDate: new Date(),
    passengers: 1,
    cabinClass: 'Economy',
    tripType: 'One way',
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [flights, setFlights] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.fromAirport || !searchParams.toAirport) {
      alert('Please select airports from the suggestions');
      return;
    }
  
    setIsLoading(true);
    try {
      const flights = await searchFlights({
        originSkyId: searchParams.fromAirport.skyId,
        destinationSkyId: searchParams.toAirport.skyId,
        originEntityId: searchParams.fromAirport.entityId,
        destinationEntityId: searchParams.toAirport.entityId,
        date: format(searchParams.departureDate, 'yyyy-MM-dd'),
        returnDate: searchParams.returnDate ? format(searchParams.returnDate, 'yyyy-MM-dd') : undefined,
        tripType: searchParams.tripType.toLowerCase(), 
        adults: searchParams.passengers,
        cabinClass: searchParams.cabinClass.toLowerCase(),
      });
      // setFlights(flights);
      console.log('Flights fetched:', flights);
      onSearch({ ...searchParams, flights });
    } catch (error) {
      console.error('Error searching flights:', error);
      alert('Error searching flights. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-transparent rounded-lg">
      {/* Filters Section */}
      <div className="flex flex-wrap justify-start items-center gap-2 ">
        {/* Flight Type Dropdown */}
        <div className="flex ">
          <select
            value={searchParams.tripType}
            onChange={(e) =>
              setSearchParams({ ...searchParams, tripType: e.target.value })
            }
            className="rounded-full p-2 !bg-white/10 text-white"
          >
            <option value="One way">One Way</option>
            <option value="Round trip">Round Trip</option>
          </select>
        </div>

        {/* Cabin Class Dropdown */}
        <div className="flex rounded-full hover:bg-white/10 text-white opacity-50">
          
          <select
            value={searchParams.cabinClass}
            onChange={(e) =>
              setSearchParams({ ...searchParams, cabinClass: e.target.value })
            }
            className="bg-transparent text-white rounded-lg p-2"
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First Class</option>
          </select>
        </div>

        {/* Passengers Dropdown */}
        <div className="flex rounded-full hover:bg-white/10 text-white opacity-50">
          <select
            value={searchParams.passengers}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                passengers: parseInt(e.target.value, 10),
              })
            }
            className="bg-[#303134] text-white rounded-lg p-2"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Passenger{i + 1 > 1 && 's'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Search Form */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        {/* From Airport Input */}
        <div className="relative md:w-[60%] gap-2 w-full flex flex-col md:flex-row items-center">
          <AirportInput
            value={searchParams.from} label={''}
            onChange={(value, airport) => {
              setSearchParams({ ...searchParams, from: value, fromAirport: airport });
            }}
            placeholder="Enter city or airport"
          />
          <button className="w-fit">
            <div className="w-fit h-fit -mt-5 -ml-5 z-50 border absolute bg-[#3d3e3e] bg-opacity border-gray-300 border-opacity-50 rounded-full p-2">
              <ArrowLeftRight color="#9aa0a6" size={24} />
            </div>
          </button>
          <AirportInput
            value={searchParams.to}
            onChange={(value, airport) => {
              setSearchParams({ ...searchParams, to: value, toAirport: airport });
            } }
            placeholder="Enter city or airport" label={''}          />
        </div>

        {/* Date Pickers */}
        <div className="relative bg-[#303134] flex border rounded-lg border-gray-300 border-opacity-50 w-[40%] hover:border-opacity-70 items-center">
          <DatePicker
            selected={searchParams.departureDate}
            onChange={(date) =>
              setSearchParams({ ...searchParams, departureDate: date || new Date() })
            }
            className="w-full bg-transparent outline-none text-white p-3 rounded-lg mt-2"
            minDate={new Date()}
            placeholderText="Departure"
          />
          {searchParams.tripType === 'Round trip' && (
            <>
              <span className="px-2">|</span>
              <DatePicker
                selected={searchParams.returnDate}
                onChange={(date) =>
                  setSearchParams({ ...searchParams, returnDate: date || new Date() })
                }
                className="w-full bg-transparent outline-none text-white p-3 rounded-lg mt-2"
                minDate={searchParams.departureDate}
                placeholderText="Return"
              />
            </>
          )}
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="bg-[#62A5F8] text-black px-8 py-3 rounded-full hover:bg-[#4285F4] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Explore'}
        </button>
      </div>
    </form>
  );
};