"use client";

import { City } from "country-state-city";
import { useWatch, useFormContext } from "react-hook-form";
import SearchableSelect from "./SearchableSelect";

export default function CitySelect({
  name = "city",
  countryFieldName = "country",
  stateFieldName = "state",
  required = true,
  disabled = false,
  onChangeHandler,
}: {
  name?: string;
  countryFieldName?: string;
  stateFieldName?: string;
  required?: boolean;
  disabled?: boolean;
  onChangeHandler?: (
    event?: any,
    newValue?: any,
    onChange?: (value: any) => void,
  ) => void;
}) {
  const { control } = useFormContext();
  const selectedCountry = useWatch({ control, name: countryFieldName });
  const selectedState = useWatch({ control, name: stateFieldName });
  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];

  return (
    <SearchableSelect
      name={name}
      label="City"
      options={cities}
      size="small"
      disabled={disabled}
      placeholder="Select City"
      required={required}
      getOptionLabel={(c) =>
        typeof c === "object" && c?.name ? c.name : c.city
      }
      isOptionEqualToValue={(o, v) => o.name === v?.name}
      onChangeHandler={onChangeHandler}
    />
  );
}
