"use client";

import { Country } from "country-state-city";
import SearchableSelect from "./SearchableSelect";

export default function CountrySelect({
  name = "country",
  required = true,
  disabled = false,
  onChangeHandler,
}: {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  onChangeHandler?: (
    event?: any,
    newValue?: any,
    onChange?: (value: any) => void,
  ) => void;
}) {
  const countries = Country.getAllCountries();

  return (
    <SearchableSelect
      name={name}
      label="Country"
      options={countries}
      size="small"
      disabled={disabled}
      placeholder="Select Country"
      required={required}
      getOptionLabel={(c) => c?.name || c?.country}
      isOptionEqualToValue={(o, v) => o?.isoCode === v?.isoCode}
      onChangeHandler={onChangeHandler}
    />
  );
}
