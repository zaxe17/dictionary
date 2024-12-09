import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Search = ({ setQuery }) => {
	const handleSearchChange = (e) => {
		const query = e.target.value;
		setQuery(query);
	};

	return (
		<form className="w-[300px] lg:w-[500px] fixed z-10">
			<motion.div
				whileInView={{ opacity: 1, width: "100%" }}
				initial={{ opacity: 0, width: 0 }}
				transition={{ duration: 1 }}
				className="relative">
				<input
					type="text"
					className="w-full h-9 lg:h-full p-4 rounded-full bg-teal-400 shadow outline-none placeholder-teal-700 focus:text-white text-teal-900"
					placeholder="Search..."
					onChange={handleSearchChange}
				/>

				<button
					type="button"
					className="absolute h-auto w-auto right-[0.15rem] lg:right-1 top-1/2 -translate-y-1/2 p-2 lg:p-4 text-teal-900 bg-teal-500 rounded-full flex justify-center items-center">
					<FaSearch />
				</button>
			</motion.div>
		</form>
	);
};

export default Search;
