import { ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';

interface Props {
  passengers: number;
  cabinClass: string;
  onChange: (passengers: number, cabinClass: string) => void;
}

export const PassengersSelect = ({ passengers, cabinClass, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const cabinClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#303134] text-white p-3 rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>{passengers} passenger, {cabinClass}</span>
        </div>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#303134] rounded-lg shadow-lg p-4 z-50">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Passengers</label>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  type="button"
                  onClick={() => onChange(Math.max(1, passengers - 1), cabinClass)}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  -
                </button>
                <span>{passengers}</span>
                <button
                  type="button"
                  onClick={() => onChange(Math.min(9, passengers + 1), cabinClass)}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">Cabin class</label>
              <div className="space-y-2 mt-2">
                {cabinClasses.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => onChange(passengers, cls)}
                    className={`w-full text-left p-2 rounded ${
                      cls === cabinClass ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};