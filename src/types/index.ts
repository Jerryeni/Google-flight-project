export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
  };
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: Date;
  returnDate?: Date;
  passengers: number;
  cabinClass: string;
  tripType: string;
  fromAirport?: Airport;
  toAirport?: Airport;
  flights?: any;
}

export interface Flight {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  legs: Array<{
    departure: {
      airport: {
        name: string;
        code: string;
      };
      time: string;
    };
    arrival: {
      airport: {
        name: string;
        code: string;
      };
      time: string;
    };
    duration: string;
    airline: {
      name: string;
      code: string;
    };
  }>;
}