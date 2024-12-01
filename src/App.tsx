import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PopularDestinations } from './components/PopularDestinations';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#202124] text-white">
        <Header />
        <main>
          <HeroSection />
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <PopularDestinations />
              <FAQ />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;