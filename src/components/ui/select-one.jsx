"use client";

export function SelectOne({
  label,
  inputStyle = "form",
  name,
  error,
  value,
  onChange,
  onBlur,
  options = [],
}) {
  const style = {
    form: "mt-1 block w-full px-3 py-[10.5px] border border-black rounded-md shadow-sm focus:outline-none sm:text-sm",
  };

  return (
    <div className="w-full ">
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        className={style[inputStyle]}
        name={name}
        {...(value ? {value: value} : null)}
        defaultValue=""
        {...(onChange
          ? { onChange: (event) => onChange(event.target.value) }
          : {})}
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
