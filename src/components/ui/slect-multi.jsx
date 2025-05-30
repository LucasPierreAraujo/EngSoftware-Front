"use client";


import Select from "react-select";

export default function SelectMultiGrouped({
  label,
  error,
  options,
  onChange,
  value,
}) {

  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Select
        isMulti
        name="habilidades"
        placeholder="Digite uma habilidade"
        options={options}
        value={value}
        className="mt-1 block w-full"
        onChange={(e) => onChange(e)}
        styles={{
          control: (base, state) => ({
            ...base,
            width: "100%",
            padding: "4px 8px",
            backgroundColor: "transparent",
            borderRadius: "6px",
            border: "0.3px solid #000000",
            fontSize: "0.875rem",
            outline: state.isFocused ? "1px solid #000000" : "none",
            borderColor: "#000000",
            "&:hover": {
              borderColor: "#00000",
            },
          }),
          multiValue: (base) => ({
            ...base,
            borderRadius: "20px",
            padding: "2px 8px",
            marginRight: "5px",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "black",
            fontWeight: "bold",
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "white",
            ":hover": {
              backgroundColor: "transparent",
            },
          }),
        }}
      />

      <p
        className={`text-sm text-blue-500 transition-opacity duration-150 px-2 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error ? error : "."}
      </p>
    </div>
  );
}