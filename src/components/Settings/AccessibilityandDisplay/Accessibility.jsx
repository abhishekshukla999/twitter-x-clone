import { SettingItemsContainer, BackButton } from "../../index";

function Accessibility() {
    document.title = "Accessibility / X";

    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">Accessibility</div>
                </div>
            </div>

            <div>
                <div className="py-3 px-2 text-[13px] text-gray-500">
                    Manage aspects of your X experience such as limiting color
                    contrast and motion. These settings affect all the X
                    accounts on this browser.
                </div>

                <div className="px-2 py-3 text-xl font-bold">Vision</div>

                <div className="leading-5 py-3 px-2 w-full">
                    <div className="text-[15px] flex justify-between">
                        <p>Increase color contrast</p>
                        <input type="checkbox" className="w-6 cursor-pointer" />
                    </div>
                    <div className="text-[13px] text-gray-500">
                        Improves legibility by increasing the contrast between
                        text and background colors.
                    </div>
                </div>

                <small className="py-3 px-2 text-red-400">
                    This feature will be available soon
                </small>
            </div>
        </SettingItemsContainer>
    );
}

export default Accessibility;
