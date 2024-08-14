function SettingItemsContainer({ children }) {
    return (
        <div className="xl:flex-[0_0_43%] max-[1279px]:flex-[0_0_50%] max-[1004px]:flex-[0_0_80%] max-[704px]:flex-[0_0_100%] border-r dark:border-gray-800 dim:border-gray-800 h-full sticky top-0 overflow-y-auto">
            {children}
        </div>
    );
}

export default SettingItemsContainer;
