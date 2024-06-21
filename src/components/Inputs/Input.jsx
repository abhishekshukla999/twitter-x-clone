import React, { forwardRef } from "react";

const Input = forwardRef(function Input({ type }, ref) {
    return (
        <div>
            <input type={type} ref={ref} />
        </div>
    );
});

export default Input;
