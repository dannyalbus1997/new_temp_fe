"use client";

import { State } from "country-state-city";
import { useWatch, useFormContext } from "react-hook-form";
import SearchableSelect from "./SearchableSelect";

export default function StateSelect({
  name = "state",
  countryFieldName = "country",
  required = true,
  disabled = false,
  onChangeHandler,
}: {
  name?: string;
  countryFieldName?: string;
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
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  return (
    <SearchableSelect
      name={name}
      label="State"
      options={states}
      required={required}
      disabled={disabled}
      placeholder="Select State"
      size="small"
      getOptionLabel={(s) =>
        typeof s === "object" && s?.name ? s.name : s.state
      }
      isOptionEqualToValue={(o, v) => o.isoCode === v?.isoCode}
      onChangeHandler={onChangeHandler}
    />
  );
}
