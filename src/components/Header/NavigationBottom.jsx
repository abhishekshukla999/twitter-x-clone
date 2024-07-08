import { NavLink } from "react-router-dom";

function NavigationBottom() {
    const listStyle = "flex p-3 text-xl hover:bg-zinc-200 w-fit";

    return (
        <div className="nav-bottom hidden max-[499px]:flex justify-between fixed bottom-0 bg-white w-full  ">
            <div>
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `${listStyle} ${isActive ? "bg-gray-200" : null}`
                    }
                    title="Home"
                >
                    <span className="mx-1">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                        >
                            <g>
                                <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                        `${listStyle} ${isActive ? "bg-gray-200" : null}`
                    }
                    title="Explore"
                >
                    <span className="mx-1">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                        >
                            <g>
                                <path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/notifications"
                    className={({ isActive }) =>
                        `${listStyle} ${isActive ? "bg-gray-200" : null}`
                    }
                    title="Notifications"
                >
                    <span className="mx-1">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                        >
                            <g>
                                <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                        `${listStyle} ${isActive ? "bg-gray-200" : null}`
                    }
                    title="Messages"
                >
                    <span className="mx-1">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                        >
                            <g>
                                <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
            </div>
        </div>
    );
}

export default NavigationBottom;
