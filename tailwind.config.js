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
        ".contrast",
    ],
    theme: {
        extend: {
            colors: {
                "twitter-dim-bg": "#15202B",
                "twitter-lightsout-bg": "#000000",
                "twitter-blue": "#1D9BF0",
                "twitter-yellow": "#FFD400",
                "twitter-crimson": "#F91880",
                "twitter-purple": "#7856FF",
                "twitter-orange": "#FF7A00",
                "twitter-green": "#00BA7C",
                "contrast-twitter-blue": "#003886",
                "contrast-twitter-yellow": "#6F3E00",
                "contrast-twitter-crimson": "#890A46",
                "contrast-twitter-purple": "#5234B7",
                "contrast-twitter-orange": "#FFFFFF",
                "contrast-twitter-green": "#FFFFFF",
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
            addVariant("contrast", ".contrast &");
        },
    ],
};
