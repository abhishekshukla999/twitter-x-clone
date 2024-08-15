import { Follow } from "../";

function FollowCard() {
    return (
        <div>
            <div className="flex justify-between text-base">
                <div className="flex">
                    <div className="m-3">
                        <img
                            className="w-10 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col p-1">
                        <span className="font-bold">Abhishek Shukla</span>
                        <span>@username</span>
                    </div>
                </div>
                <div className="mx-2">
                    <button className="w-20 mx-2 text-base text-white bg-black hover:bg-gray-800 rounded-full">
                        <div className="p-2">Follow</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FollowCard;
