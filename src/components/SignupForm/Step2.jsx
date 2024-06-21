import React from "react";

function Step2({ register, onBack }) {
    return (
        <>
            <div>Step2</div>
            <input type="password" placeholder="Password" {...register("password")} />
            <input type="file" placeholder="profile" {...register('avatar')} />
            <input type="text" placeholder="username" {...register('username')} />

            <button onClick={onBack}>Back</button>
            <br />
            <button type="submit">Submit</button>
        </>
    );
}

export default Step2;
