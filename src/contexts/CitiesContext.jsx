/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Use local data in production, JSON server in development
const BASE_URL = import.meta.env.PROD 
  ? null 
  : "http://localhost:3001/cities";

// Local data for production
const LOCAL_CITIES_DATA = [
  {
    "cityName": "Lisbon",
    "country": "Portugal",
    "emoji": "pt",
    "date": "2027-10-31T15:59:59.138Z",
    "notes": "My favorite city so far!",
    "position": {
      "lat": 38.727881642324164,
      "lng": -9.140900099907554
    },
    "id": 73930385
  },
  {
    "cityName": "Madrid",
    "country": "Spain",
    "emoji": "es",
    "date": "2027-07-15T08:22:53.976Z",
    "notes": "",
    "position": {
      "lat": 40.46635901755316,
      "lng": -3.7133789062500004
    },
    "id": 17806751
  },
  {
    "cityName": "Berlin",
    "country": "Germany",
    "emoji": "de",
    "date": "2027-02-12T09:24:11.863Z",
    "notes": "Amazing 😃",
    "position": {
      "lat": 52.53586782505711,
      "lng": 13.376933665713324
    },
    "id": 98443197
  },
  {
    "cityName": "Paris",
    "country": "France",
    "emoji": "FR",
    "date": "2025-07-27T19:08:10.118Z",
    "notes": "PAAARIS",
    "position": {
      "lat": "48.821332549646655",
      "lng": "2.3794952186785423"
    },
    "id": 98443198
  },
  {
    "cityName": "Vila-real",
    "country": "Spain",
    "emoji": "ES",
    "date": "2025-07-27T19:09:47.766Z",
    "notes": "",
    "position": {
      "lat": "39.93185387996176",
      "lng": "-0.09734396249018619"
    },
    "id": 98443199
  }
];

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      
      // In production, use local data; in development, fetch from JSON server
      if (import.meta.env.PROD) {
        // Simulate loading delay for better UX
        setTimeout(() => {
          dispatch({ type: "cities/loaded", payload: LOCAL_CITIES_DATA });
        }, 500);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // Fallback to local data if JSON server fails
        dispatch({ type: "cities/loaded", payload: LOCAL_CITIES_DATA });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      
      // In production, find city from local data
      if (import.meta.env.PROD) {
        const city = cities.find(c => c.id === Number(id));
        if (city) {
          dispatch({ type: "city/loaded", payload: city });
        } else {
          dispatch({
            type: "rejected",
            payload: "City not found",
          });
        }
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        // Fallback to local data
        const city = cities.find(c => c.id === Number(id));
        if (city) {
          dispatch({ type: "city/loaded", payload: city });
        } else {
          dispatch({
            type: "rejected",
            payload: "There was an error loading the city",
          });
        }
      }
    },
    [currentCity.id, cities]
  );
  
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    
    // In production, create city locally
    if (import.meta.env.PROD) {
      const cityWithId = {
        ...newCity,
        id: Date.now() + Math.random(),
        date: new Date().toISOString()
      };
      dispatch({ type: "city/created", payload: cityWithId });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      // Fallback to local creation
      const cityWithId = {
        ...newCity,
        id: Date.now() + Math.random(),
        date: new Date().toISOString()
      };
      dispatch({ type: "city/created", payload: cityWithId });
    }
  }
  
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    
    // In production, delete city locally
    if (import.meta.env.PROD) {
      dispatch({ type: "cities/deleted", payload: id });
      return;
    }

    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      // Fallback to local deletion
      dispatch({ type: "cities/deleted", payload: id });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
