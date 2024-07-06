import { Search, WhatsHappening, WhoToFollow } from "../index";

function Aside() {
    return (
        <aside className="max-w-xl sticky top-0 mr-auto overflow-y-auto overflow-x-hidden min-h-full hidden lg:block">
            <Search />
            <WhatsHappening />
            <WhoToFollow />
            <div className="p-5 text-zinc-600 text-[13px] max-w-[22rem]">
                <ul className="flex gap-2 flex-wrap">
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                    <li>Accessibility</li>
                    <li>Ads info</li>
                    <li>More...</li>
                    <li>&copy; 2024 X Corp.</li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
