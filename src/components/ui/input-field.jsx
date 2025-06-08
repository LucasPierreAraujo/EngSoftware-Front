"use client";

import clsx from "clsx";

export function InputField({
  label,
  required,
  inputStyle = "login",
  name,
  error,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  success,
  errorBorder,
}) {
  const style = {
    login: clsx(
      "border p-2 rounded-sm w-full mt-1 bg-w transition-colors duration-150",
      {
        "border-green-500": success,
        "border-red-500": errorBorder || error,
        "border-[#141414]": !success && !errorBorder && !error,
      }
    ),
    form: clsx(
      "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-150",
      {
        "border-green-500": success,
        "border-red-500": errorBorder || error,
        "border-gray-300": !success && !errorBorder && !error,
      }
    ),
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-black">{label}</label>
      )}
      <input
        className={style[inputStyle]}
        placeholder={placeholder}
        required={required}
        name={name}
        id={name}
        type={type}
        {...(onChange
          ? { onChange: (event) => onChange(event.target.value) }
          : {})}
        {...(value !== undefined ? { value } : {})}
        {...(onBlur ? { onBlur } : {})}
      />
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
