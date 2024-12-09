import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { WORDS, BOOKS } from "../words";
import Popup from "./Popup";
import { motion } from "framer-motion";

const Searchbar = () => {
	const [activeSearch, setActiveSearch] = useState([]);
	const [popupContent, setPopupContent] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const searchBarRef = useRef(null);

	const handleSearch = (e) => {
		const searchQuery = e.target.value.toLowerCase();

		if (searchQuery === "") {
			setActiveSearch([]);
			return;
		}

		const filteredWords = WORDS.map((letterObj) =>
			letterObj.description
				.filter((desc) =>
					desc.word.toLowerCase().startsWith(searchQuery)
				)
				.map((desc) => ({
					word: desc.word,
					pronounce: desc.pronounce,
					desc: desc.desc,
				}))
		).flat();

		const filteredBooks = BOOKS.filter((book) =>
			book.title.toLowerCase().startsWith(searchQuery)
		).map((book) => ({
			title: book.title,
			author: book.author,
		}));

		const combinedResults = [...filteredWords, ...filteredBooks].slice(
			0,
			8
		);

		setActiveSearch(combinedResults);
	};

	const openPopup = (content) => {
		setPopupContent(content);
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setPopupContent(null);
		setIsPopupOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchBarRef.current &&
				!searchBarRef.current.contains(event.target)
			) {
				setActiveSearch([]);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<form ref={searchBarRef} className="w-[300px] lg:w-[500px] relative">
			<motion.div
				whileInView={{ opacity: 1, width: "100%" }}
				initial={{ opacity: 0, width: 0 }}
				transition={{ duration: 1 }}
				className="relative">
				<input
					type="search"
					placeholder="Search..."
					className="w-full h-9 lg:h-full p-4 rounded-full bg-teal-400 shadow outline-none placeholder-teal-700 focus:text-white text-teal-900"
					onChange={(e) => handleSearch(e)}
				/>
				<button className="absolute h-auto w-auto right-[0.15rem] lg:right-1 top-1/2 -translate-y-1/2 p-2 lg:p-4 text-teal-900 bg-teal-500 rounded-full flex justify-center items-center">
					<FaSearch />
				</button>
			</motion.div>

			{activeSearch.length > 0 && (
				<div className="absolute top-20 p-2 bg-teal-500 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
					{activeSearch.map((result, index) => (
						<div key={index} className="flex flex-col hover:bg-teal-400 p-1 rounded-md">
							{result.word ? (
								<span
									className="font-bold cursor-pointer"
									onClick={() =>
										openPopup(
											<div className="w-fit mx-auto my-4 max-w-full">
												<div className="sticky top-0 bg-teal-100 z-10">
													<h1 className="text-center capitalize text-5xl font-bold mb-2">
														{result.word}
													</h1>
													<p className="text-center text-md italic mb-4 border-b border-teal-600 pb-2">
														[ {result.pronounce} ]
													</p>
												</div>
												<ol className="list-decimal list-inside">
													{result.desc.map(
														(desc, descIndex) => (
															<li
																key={descIndex}
																className="lg:text-xl break-words overflow-y-scroll pb-5 scroll-hidden">
																{desc}
															</li>
														)
													)}
												</ol>
											</div>
										)
									}>
									Dictionary: {result.word}
								</span>
							) : (
								<span
									className="font-bold cursor-pointer"
									onClick={() =>
										openPopup(
											<>
												<h3 className="text-xl font-bold">
													{result.title}
												</h3>
												<p className="italic">
													{result.author}
												</p>
											</>
										)
									}>
									Book: {result.title}
								</span>
							)}
						</div>
					))}
				</div>
			)}

			<Popup open={isPopupOpen} onClose={closePopup}>
				{popupContent}
			</Popup>
		</form>
	);
};

export default Searchbar;
