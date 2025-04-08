"use client";

export function TextArea({ label, inputStyle = "form", name, error, type = "text", value, onChange, onBlur, placeholder }) {

    const style = {
        form: 'mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm  focus:border-orange-500 sm:text-sm h-24 resize-none'
    }
        
    return (
        <div>
            {label && (
                <label className="text-sm font-medium ">
                    {label}
                </label>
            )}
            <textarea 
                className={style[inputStyle]} 
                placeholder={placeholder}
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