function LoadCardContainer({ children }) {
    return (
        <div
            role="status"
            className="max-w-sm p-4 rounded animate-pulse md:p-6"
        >
            {children}
        </div>
    );
}

export default LoadCardContainer;
