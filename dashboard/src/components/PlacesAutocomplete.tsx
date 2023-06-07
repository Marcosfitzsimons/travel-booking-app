import { useEffect, useRef } from "react";

const PlacesAutocomplete = () => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        componentRestrictions: { country: "AR" },
        types: ["address"],
        fields: ["address_components"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place);
    });
  }, []);

  return (
    <input
      ref={autocompleteRef}
      type="text"
      placeholder="Enter an address in Carmen de Areco, Buenos Aires"
    />
  );
};

export default PlacesAutocomplete;
