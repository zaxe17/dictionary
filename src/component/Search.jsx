import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Search = ({ setQuery }) => {

	/* HANDLE ITEMS IN BOOKS AND WORDS */
	const handleSearchChange = (e) => {
		const query = e.target.value;
		setQuery(query);
	};
	
	/* SEARCHBAR FOR BOOKS AND DICTIONARY CONTENTS */
	return (
		<form className="w-[300px] lg:w-[500px] fixed z-10">
			<motion.div
				whileInView={{ width: "100%" }}
				initial={{ width: "11%" }}
				transition={{ duration: 1 }}
				className="relative">

				{/* IMPUT SEARCHBAR */}
				<input
					type="text"
					className="w-full h-9 lg:h-full p-4 rounded-full bg-teal-400 shadow-xl outline-none placeholder-teal-700 focus:text-white text-teal-900"
					placeholder="Search..."
					onChange={handleSearchChange}
				/>

				{/* BUTTON AND ICON ON SEACHBAR */}
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
