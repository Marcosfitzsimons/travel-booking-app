import { Loader } from "@googlemaps/js-api-loader";

import { PlaceDetail, Prediction } from "@/components/AddressAutocomplete";

type PlacesServiceStatus =
  | "INVALID_REQUEST"
  | "NOT_FOUND"
  | "OK"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR"
  | "ZERO_RESULTS";


type GoogleApiClient = {
    maps: {
      places: {
        AutocompleteSessionToken: { new (): string };
        AutocompleteService: {
          new (): {
            getPlacePredictions: (
              params: {
                input: string;
                sessionToken: string | undefined;
                componentRestrictions: any;
                types: any;
              },
              callback: (
                predictions: Prediction[],
                status: PlacesServiceStatus
              ) => void
            ) => void;
          };
        };
        PlacesService: {
          new (attributionNode: HTMLElement): {
            getDetails: (
              params: {
                placeId: string;
                fields?: string[];
                sessionToken: string | undefined;
              },
              callback: (place: PlaceDetail, status: PlacesServiceStatus) => void
            ) => void;
          };
        };
        PlacesServiceStatus: {
          [key in PlacesServiceStatus]: PlacesServiceStatus;
        };
      };
      [key: string]: any;
    };
  }

let googleApiClient: GoogleApiClient | undefined;

export async function getGoogleMapsApiClient(): Promise<GoogleApiClient> {
  if (googleApiClient) {
    return googleApiClient;
  }
  const loader = new Loader({
    apiKey: import.meta.env.VITE_REACT_APP_GOOGLE_PLACES_API || "",
    version: "weekly",
    libraries: ["places"],
  });
  // @ts-ignore
  googleApiClient = (await loader.load()) as GoogleApiClient;
  return googleApiClient;
}