"use client";

import clsx from "clsx";

export function SelectOne({
  label,
  inputStyle = "form",
  name,
  error,
  value,
  onChange,
  onBlur,
  options = [],
  success,
  errorBorder,
}) {
  const style = {
    form: clsx(
      "mt-1 block w-full px-3 py-[10.5px] border rounded-md shadow-sm focus:outline-none sm:text-sm transition-colors duration-150",
      {
        "border-green-500": success,
        "border-red-500": errorBorder || error,
        "border-black": !success && !errorBorder && !error,
      }
    ),
  };

  return (
    <div className="w-full text-black">
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        className={style[inputStyle]}
        name={name}
        {...(value ? { value: value } : null)}
        defaultValue=""
        {...(onChange
          ? { onChange: (event) => onChange(event.target.value) }
          : {})}
        {...(onBlur ? { onBlur } : {})}
      >
        <option disabled value="">
          Selecionar...
        </option>
        {options.map((option, index) => (
          <option key={index} className="text-black" value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <p
        className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error ? error : "."}
      </p>
    </div>
  );
}
