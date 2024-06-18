import React from "react";

function Step1({ register, onNext }) {
    return (
        <>
            <div>Step1</div>
            <input type="text" placeholder="Name" {...register('name')} />
            <input type="email" placeholder="Email" {...register('email')} />
            <input type="password" placeholder="Password" {...register('password')} />

            <button onClick={onNext}>Next</button>
        </>
    );
}

export default Step1;
