function Loader() {
    return (
        <div className="flex justify-center items-center">
            <svg
                className="w-9 bg-transparent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="200"
                height="200"
            >
                <g>
                    <circle
                        strokeDasharray="164.93361431346415 56.97787143782138"
                        r="35"
                        strokeWidth="10"
                        stroke="#1a8cd8"
                        fill="none"
                        cy="50"
                        cx="50"
                    >
                        <animateTransform
                            keyTimes="0;1"
                            values="0 50 50;360 50 50"
                            dur="1s"
                            repeatCount="indefinite"
                            type="rotate"
                            attributeName="transform"
                        ></animateTransform>
                    </circle>
                    <g></g>
                </g>
            </svg>
        </div>
    );
}

export default Loader;
