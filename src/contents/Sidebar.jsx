import { FaHome, FaBook } from "react-icons/fa";
import { SiDictionarydotcom } from "react-icons/si";
import { GiOpenBook } from "react-icons/gi";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarToggle }) => {
	return (
		<div
			className={`${
				sidebarToggle ? "translate-x-[-100%]" : "translate-x-0"
			} w-64 bg-teal-600 fixed h-full px-4 py-2 transition-all duration-300 ease-in-out`}>
			<div className="my-2 mb-4">
				<h1 className="text-2xl text-white font-bold">
					<SiDictionarydotcom className="inline-block w-6 h-6 mr-2 -mt-2" />
					Dictionary
				</h1>
			</div>

			<hr />

			<ul className="mt-3 text-white font-bold">
				<li className="mb-2 rounded hover:shadow hover:bg-teal-500 py-2">
					<Link to="/" className="px-3">
						<FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
						Home
					</Link>
				</li>
				<li className="mb-2 rounded hover:shadow hover:bg-teal-500 py-2">
					<Link to="/dictionary" className="px-3">
						<GiOpenBook className="inline-block w-6 h-6 mr-2 -mt-2" />
						Dictionary
					</Link>
				</li>
				<li className="mb-2 rounded hover:shadow hover:bg-teal-500 py-2">
					<Link to="/books" className="px-3">
						<FaBook className="inline-block w-6 h-6 mr-2 -mt-2" />
						Books
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
