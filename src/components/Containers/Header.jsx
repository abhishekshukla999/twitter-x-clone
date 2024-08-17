import { LogoutButton, Navigation } from "../index";

function Header() {
    return (
        <header className="2xl:flex-[0_0_31%] xl:flex-[0_0_25%] lg:flex-[0_0_25%] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col justify-between h-screen ml-auto xl:w-[268px] w-fit max-[499px]:hidden">
                <Navigation />
                <LogoutButton />
            </div>
        </header>
    );
}

export default Header;
