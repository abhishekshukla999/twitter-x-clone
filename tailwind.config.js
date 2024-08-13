/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: [
        "selector",
        ".dark",
        ".dim",
        ".yellow",
        ".crimson",
        ".purple",
        ".orange",
        ".green",
    ],
    theme: {
        extend: {
            colors: {
                "twitter-blue": "#1D9BF0",
                "twitter-yellow": "#FFD400",
                "twitter-crimson": "#F91880",
                "twitter-purple": "#7856FF",
                "twitter-orange": "#FF7A00",
                "twitter-green": "#00BA7C",
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("purple", ".purple &");
            addVariant("yellow", ".yellow &");
            addVariant("crimson", ".crimson &");
            addVariant("orange", ".orange &");
            addVariant("green", ".green &");
        },
    ],
};
