import { Menu, Plane, Hotel, Search, Map, Home } from 'lucide-react';
import { GoogleLogo } from './Icons';

export const Header = () => {
  return (
    <header className="bg-[#1a1a1a] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6" />
          <div className="flex items-center space-x-2">
            <GoogleLogo className="h-8 w-8" />
            <span className="text-xl font-medium">Flights</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavItem icon={Search} text="Explore" />
          <NavItem icon={Plane} text="Flights" active />
          <NavItem icon={Hotel} text="Hotels" />
          <NavItem icon={Home} text="Vacation rentals" />
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Map className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-500"></div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ icon: Icon, text, active }: { icon: any; text: string; active?: boolean }) => (
  <button className={`flex items-center space-x-2 p-2 rounded-full ${active ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </button>
);