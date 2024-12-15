import { FaHome, FaBook } from "react-icons/fa";
import { SiDictionarydotcom } from "react-icons/si";
import { GiOpenBook } from "react-icons/gi";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarToggle, setSidebarToggle  }) => {
	/* HANDLE TOGGLE SIDEBAR */
	const handleLinkClick = () => {
        setSidebarToggle(false);
    };

	return (
		<div /* TRANSLATE OF SIDEBAR IF TOGGLE OR NOT */
			className={`${
				sidebarToggle
					? "translate-x-0 lg:-translate-x-full"
					: "lg:translate-x-0 -translate-x-full"
			} w-full lg:w-64 text-center lg:text-start bg-teal-600 fixed h-full px-4 py-2 transition-all duration-300 ease-in-out z-50`}>
			
			{/* SIDEBAR LOGO NAME */}
			<div className="my-2 mb-4">
				<h1 className="text-2xl text-teal-50 font-bold">
					<SiDictionarydotcom className="inline-block w-6 h-6 mr-2 -mt-2" />
					Dictionary
				</h1>
			</div>

			<hr />

			{/* SIDEBAR LINKS */}
			<ul className="mt-3 text-teal-50 font-bold">

				{/* HOME CONTENT */}
				<li className="mb-2 rounded hover:shadow hover:bg-teal-500">
					<Link
						to="/"
						className="block px-3 py-2"
						onClick={handleLinkClick}>
						<FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
						Home
					</Link>
				</li>

				{/* DICTIONARY CONTENT */}
				<li className="mb-2 rounded hover:shadow hover:bg-teal-500">
					<Link
						to="/dictionary"
						className="block px-3 py-2"
						onClick={handleLinkClick}>
						<GiOpenBook className="inline-block w-6 h-6 mr-2 -mt-2" />
						Dictionary
					</Link>
				</li>

				{/* BOOKS CONTENT */}
				<li className="mb-2 rounded hover:shadow hover:bg-teal-500">
					<Link
						to="/books"
						className="block px-3 py-2"
						onClick={handleLinkClick}>
						<FaBook className="inline-block w-6 h-6 mr-2 -mt-2" />
						Books
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
