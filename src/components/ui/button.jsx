export function Button({ 
    type = "submit", 
    onClick = () => null, 
    children, 
    rounded, 
    alternative = false 
  }) {
    const backgroundColor = alternative ? "#2D3748" : "#2A2567";
    const textColor = alternative ? "#F7FAFC" : "#FFFFFF";
  
    return (
      <button
        className={`${rounded} p-2 rounded-3xl transition-all duration-300`}
        style={{ backgroundColor, color: textColor }}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
      
    );
  }