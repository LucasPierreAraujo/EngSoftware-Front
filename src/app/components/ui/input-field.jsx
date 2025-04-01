"use client";

export function InputField({ label, required, inputStyle = "login", name, error, type = "text", value, onChange, onBlur, placeholder }) {

    const style = {
        login: 'border  p-2 rounded-sm w-full border-[#141414]  mt-1 bg-w',
        form: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
    }
        
    return (
        <div className="w-full">
            {label && (
                <label className="text-sm font-medium text-black">
                    {label}
                </label>
            )}
            <input 
                className={style[inputStyle]} 
                placeholder={placeholder}
                required={required}
                name={name} 
                id={name} 
                type={type}
                {...onChange ? {onChange: (event) => onChange(event.target.value) } : {}}
                {...(value !== undefined ? { value}  : {})}
                {...onBlur ? {onBlur} : {}} 
                {...value ? {value} : {}}

            />
            <p className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${error ? 'opacity-100' : 'opacity-0'}`}>{error ? error : '.'}</p>
        </div>
    );
    
}