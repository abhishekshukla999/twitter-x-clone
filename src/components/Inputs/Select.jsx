import { forwardRef, useState, useId } from "react";

const Select = forwardRef(function Select(
    { label, options = [], className = "", ...props },
    ref
) {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();

    return (
        <div
            className={`py-1 px-2 leading-5 rounded-md ${
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
                <select
                    id={id}
                    className={`text-base w-full cursor-pointer focus:outline-none appearance-none bg-no-repeat bg-right bg-[length:23px] ${className} ${
                        isFocused
                            ? "bg-[url('/dropdown-blue.svg')]"
                            : "bg-[url('/dropdown-gray.svg')]"
                    }`}
                    ref={ref}
                    {...props}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <option value="" defaultChecked disabled>
                        Select
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
});

export default Select;
