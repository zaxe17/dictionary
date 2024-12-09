import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
    const location = useLocation();

    const pageTitles = {
        "/": "Home",
        "/dictionary": "Dictionary",
        "/books": "Books",
    };

    const getTitle = () => pageTitles[location.pathname] || "App";

    const isSearchPage = ["/dictionary", "/books"].includes(location.pathname);

    return (
		<nav className="bg-teal-600 px-4 py-3 flex justify-between sticky top-0 w-full z-50">
			<div className="flex items-center text-xl">
				<HiMenuAlt2
					className="text-white me-1 cursor-pointer text-3xl"
					onClick={() => setSidebarToggle(!sidebarToggle)}
				/>
				<span className="text-white font-semibold">{getTitle()}</span>
			</div>

			<div className="flex items-center gap-x-1 lg:gap-x-5">
				{/* <div
					className={`relative md:w-65 w-40 lg:w-60 ${
						isSearchPage ? "block" : "hidden"
					}`}>
					<span className="absolute inset-y-0 left-0 flex items-center pl-2">
						<button className="p-1 focus:outline-none text-white md:text-black">
							<FaSearch />
						</button>
					</span>
					<input
						type="text"
						className="w-full px-4 py-1 pl-12 rounded-full shadow outline-none"
						placeholder="Search..."
						onChange={handleSearchChange}
					/>
				</div> */}

				{/* <div className="text-white">
                    <FaBell className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>

                <div className="relative">
                    <button className="text-white group">
                        <FaUserCircle className="w-5 h-5 lg:w-6 lg:h-6 mt-1" />
                        <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
                            <ul className="py-2 text-sm text-gray-950">
                                <li>
                                    <a href="#">Profile</a>
                                </li>
                                <li>
                                    <a href="#">Settings</a>
                                </li>
                                <li>
                                    <a href="#">Login</a>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div> */}
			</div>
		</nav>
	);
};

export default Navbar;
