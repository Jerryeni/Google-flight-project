import { ChevronRight } from 'lucide-react';

const destinations = [
  { name: 'Abuja', image: 'https://images.unsplash.com/photo-1572816703439-d8b34c4dc93f' },
  { name: 'Lagos', image: 'https://images.unsplash.com/photo-1577253313708-cab167d2c474' },
  { name: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1588362951121-ef311a93b663' },
  { name: 'Owerri', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92' },
  { name: 'Kano', image: 'https://images.unsplash.com/photo-1578893771254-f0e4f0c71032' },
  { name: 'Enugu', image: 'https://images.unsplash.com/photo-1562729421-fe0dc3f92725' },
  { name: 'Benin City', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded' },
];

export const PopularDestinations = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6 text-white">Popular destinations from Asaba</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {destinations.map((destination) => (
          <div
            key={destination.name}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-medium">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};