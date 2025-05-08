export function Button({
  type = "submit",
  onClick = () => null,
  children,
  rounded,
  alternative = false,
  background = null,
  color = null,
  disabled = false
}) {
  const backgroundColor = background ? background : (alternative ? "#2D3748" : "#2A2567");
  const textColor = color ? color : (alternative ? "#F7FAFC" : "#FFFFFF");
  

  return (
    <button
      className={`${rounded} px-3 py-2 rounded-3xl transition-all duration-300 flex justify-center items-center cursor-pointer`}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
