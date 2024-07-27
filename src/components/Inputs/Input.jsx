import { forwardRef, useState, useId } from "react";

const Input = forwardRef(function Input(
    { label, type = "text", className = "", placeholder = "", ...props },
    ref
) {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();

    return (
        <div
            className={`py-1 px-2 leading-5 rounded-sm ${
                isFocused ? "ring-2 ring-twitter-blue" : "ring-1 ring-gray-300"
            }`}
        >
            <div>
                <label
                    className={`text-[13px] ${
                        isFocused ? "text-twitter-blue" : "text-gray-500"
                    }`}
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>
            <div className="my-1">
                <input
                    id={id}
                    className={`text-[15px]  focus:outline-none ${className}`}
                    placeholder={placeholder}
                    type={type}
                    ref={ref}
                    {...props}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
});

export default Input;
