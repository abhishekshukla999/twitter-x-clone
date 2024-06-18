import React from "react";

function Step2({ register, onBack, onSubmit }) {
    return (
        <>
            <div>Step2</div>
            <input type="date" {...register("dob")} />
            <input type="file" name="" id="" />

            <button onClick={onBack}>Back</button>
            <p></p>
            <button onClick={onSubmit}>Submit</button>
        </>
    );
}

export default Step2;
