import React, { useRef, useState } from "react";
import { getGoogleMapsApiClient } from "../lib/googleApiClient";
import { Input } from "./ui/input";
import { Milestone } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export type Prediction = {
  description: string;
  place_id: string;
};

export type PlaceDetail = {
  // fields here depend on the fields param passed to getDetails
  formatted_address?: string;
  geometry?: {
    location: { lat: () => number; lng: () => number };
  };
  name?: string;
  place_id?: string;
};

type AddressAutocompleteProps = {
  value: string;
  id: string;
  setValue: (e: any) => void;
};

const AddressAutocomplete = ({
  value,
  id,
  setValue,
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const sessionTokenRef = useRef<string>();

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!newValue || newValue.trim().length <= 3) {
      setSuggestions([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const google = await getGoogleMapsApiClient();

      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      }

      // @see https://developers.google.com/maps/documentation/javascript/place-autocomplete
      new google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: newValue,
          sessionToken: sessionTokenRef.current,
          componentRestrictions: { country: "AR" },
          types: ["address"],
        },
        (predictions: any, status: any) => {
          console.log(predictions, status);
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setSuggestions([]);
            setValue("");
            setError(true);
            return;
          }
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            alert(status);
            return;
          }
          setError(false);
          setSuggestions(predictions);
        }
      );
    }, 350);
  };

  const handleSuggestionSelected = (suggestion: any) => {
    setValue(suggestion.structured_formatting.main_text);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="w-full relative flex items-center">
        <Milestone className="z-30 h-5 w-5 text-accent absolute left-[10px] pb-[2px] " />
        <Input
          id={id}
          placeholder="Las Heras 2304"
          className="pl-[32px] w-full"
          type="text"
          onBlur={() => {
            setTimeout(() => setSuggestions([]), 100); // Delay the onBlur event to allow the onClick event to trigger first
          }}
          onChange={handleChange}
          value={value}
        />
        {error && (
          <p className="text-red-600 text-sm absolute -bottom-6 left-0">
            Debes seleccionar una dirección válida
          </p>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="w-full">
          <ScrollArea className="h-72 w-full mt-2 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium text-accent leading-none">
                Selecciona tu dirección
              </h4>
              <ul role="listbox">
                {suggestions.map((suggestion) => (
                  <>
                    <li
                      className="text-sm cursor-pointer z-50"
                      key={suggestion.place_id}
                      tabIndex={-1}
                      role="option"
                      aria-selected="false"
                      onClick={() => handleSuggestionSelected(suggestion)}
                    >
                      {suggestion.description}
                    </li>
                    <Separator className="my-2" />
                  </>
                ))}
              </ul>
            </div>
          </ScrollArea>
          <div id="googlemaps-attribution-container"></div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
