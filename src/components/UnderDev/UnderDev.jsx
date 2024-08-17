function UnderDev() {
    return (
        <div className="flex items-center justify-center xl:flex-[0_0_43%] h-[100%] border-r border-l dark:border-gray-800 dim:border-gray-800 my-auto">
            <div className="flex gap-10 px-8 flex-col w-[85%]">
                <div>
                    <div className="text-3xl font-bold m-1">
                        Feature Under Development
                    </div>
                    <div className="text-zinc-500 m-1">
                        This feature will release in future updates
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnderDev;
