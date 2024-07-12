import { Search, WhatsHappening, WhoToFollow } from "../index";

function Aside() {
    return (
        <aside className="max-w-xl sticky top-0 mr-auto overflow-y-auto overflow-x-hidden min-h-full hidden lg:block">
            <Search />
            <WhatsHappening />
            <WhoToFollow />
            <div className="p-5 text-zinc-600 text-[13px] max-w-[22rem]">
                <ul className="flex gap-2 flex-wrap">
                    <li className="hover:underline cursor-pointer">Terms of Service</li>
                    <li className="hover:underline cursor-pointer">Privacy Policy</li>
                    <li className="hover:underline cursor-pointer">Cookie Policy</li>
                    <li className="hover:underline cursor-pointer">Accessibility</li>
                    <li className="hover:underline cursor-pointer">Ads info</li>
                    <li className="hover:underline cursor-pointer">More...</li>
                    <li className="hover:underline cursor-pointer">&copy; 2024 X Corp.</li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
