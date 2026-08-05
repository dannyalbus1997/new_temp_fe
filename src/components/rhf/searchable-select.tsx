"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox"

export interface RhfComboboxOption {
  label: React.ReactNode
  value: string
  [key: string]: unknown
}

interface RhfSearchableSelectBaseProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  placeholder?: string
  emptyText?: string
  className?: string
  options: RhfComboboxOption[]
  getOptionLabel?: (option: RhfComboboxOption) => string
  getOptionValue?: (option: RhfComboboxOption) => string
  /**
   * Provide for server-driven ("async") search: called (debounced) with the
   * current query as the user types. When set, client-side filtering of
   * `options` is disabled — feed the matching results back in via `options`
   * (e.g. from an RTK Query hook) and set `loading` while the request is in flight.
   */
  onSearchChange?: (query: string) => void
  loading?: boolean
  debounceMs?: number
}

function useDebouncedCallback(callback: (value: string) => void, delay: number) {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  return React.useCallback(
    (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => callback(value), delay)
    },
    [callback, delay]
  )
}

const defaultGetOptionLabel = (option: RhfComboboxOption) => String(option?.label ?? "")
const defaultGetOptionValue = (option: RhfComboboxOption) => String(option?.value ?? "")

/** Renders the actual Combobox popup — kept separate so it can read `useFormField()`
 * (id/aria wiring) as a descendant of the surrounding `FormItem`. */
function ComboboxFieldBody({
  value,
  onChange,
  disabled,
  placeholder,
  emptyText = "No results found.",
  options,
  getOptionLabel = defaultGetOptionLabel,
  getOptionValue = defaultGetOptionValue,
  onSearchChange,
  loading,
  debounceMs = 300,
  multiple,
}: {
  value: RhfComboboxOption | RhfComboboxOption[] | null | undefined
  onChange: (value: unknown) => void
  disabled?: boolean
  placeholder?: string
  emptyText?: string
  options: RhfComboboxOption[]
  getOptionLabel?: (option: RhfComboboxOption) => string
  getOptionValue?: (option: RhfComboboxOption) => string
  onSearchChange?: (query: string) => void
  loading?: boolean
  debounceMs?: number
  multiple: boolean
}) {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField()
  const anchorRef = useComboboxAnchor()
  const debouncedSearch = useDebouncedCallback((query) => onSearchChange?.(query), debounceMs)
  const describedBy = error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
  const isMultiple = multiple
  const selectedValues = isMultiple ? ((value as RhfComboboxOption[]) ?? []) : value

  return (
    <Combobox
      items={options}
      value={selectedValues ?? (isMultiple ? [] : null)}
      onValueChange={onChange}
      multiple={isMultiple}
      disabled={disabled}
      itemToStringLabel={getOptionLabel}
      isItemEqualToValue={(a, b) => getOptionValue(a as RhfComboboxOption) === getOptionValue(b as RhfComboboxOption)}
      filter={onSearchChange ? null : undefined}
      onInputValueChange={onSearchChange ? debouncedSearch : undefined}
    >
      {isMultiple ? (
        <ComboboxChips ref={anchorRef}>
          {((value as RhfComboboxOption[]) ?? []).map((option) => (
            <ComboboxChip key={getOptionValue(option)}>
              {getOptionLabel(option)}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput
            id={formItemId}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            placeholder={placeholder}
          />
        </ComboboxChips>
      ) : (
        <ComboboxInput
          id={formItemId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          placeholder={placeholder}
          showClear
        />
      )}
      <ComboboxContent anchor={isMultiple ? anchorRef : undefined}>
        <ComboboxEmpty>{loading ? "Loading…" : emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(option: RhfComboboxOption) => (
            <ComboboxItem key={getOptionValue(option)} value={option}>
              {getOptionLabel(option)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function RhfSearchableSelectField({
  name,
  label,
  description,
  required,
  className,
  multiple,
  ...body
}: RhfSearchableSelectBaseProps & { multiple: boolean }) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}
          <ComboboxFieldBody
            {...body}
            multiple={multiple}
            value={field.value}
            onChange={field.onChange}
          />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/** Single-select searchable dropdown — shadcn/Tailwind equivalent of the old MUI `SearchableSelect`. */
export function SearchableSelect(props: RhfSearchableSelectBaseProps) {
  return <RhfSearchableSelectField {...props} multiple={false} />
}

/** Multi-select searchable dropdown with removable chips — equivalent of `SearchableSelectMultiple`. */
export function SearchableSelectMultiple(props: RhfSearchableSelectBaseProps) {
  return <RhfSearchableSelectField {...props} multiple />
}

/**
 * Single-select searchable dropdown wired for server-side search — equivalent of
 * `SearchableSelectAsync`. Pass `options` from your RTK Query hook's result and
 * `loading` from its `isFetching` flag; `onSearchChange` receives the debounced query.
 */
export function SearchableSelectAsync(props: RhfSearchableSelectBaseProps) {
  return <RhfSearchableSelectField {...props} multiple={false} />
}

/** Multi-select + server-side search — equivalent of `SearchableSelectAsyncMultiple`. */
export function SearchableSelectAsyncMultiple(props: RhfSearchableSelectBaseProps) {
  return <RhfSearchableSelectField {...props} multiple />
}
