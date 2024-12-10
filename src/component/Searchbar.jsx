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
			book.title.toLowerCase().includes(searchQuery)
		).map((book) => ({
			cover: book.cover,
			title: book.title,
			author: book.author,
			genre: book.genre,
			descriptoin: book.description
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
				whileInView={{ width: "100%" }}
				initial={{ width: "11%" }}
				transition={{ duration: 1 }}
				className="relative">
				<input
					type="search"
					placeholder="Search..."
					className="w-full h-9 lg:h-full p-4 rounded-full bg-teal-400 shadow-xl outline-none placeholder-teal-700 focus:text-white text-teal-900"
					onChange={(e) => handleSearch(e)}
				/>
				<button className="absolute h-auto w-auto right-[0.15rem] lg:right-1 top-1/2 -translate-y-1/2 p-2 lg:p-4 text-teal-900 bg-teal-500 rounded-full flex justify-center items-center">
					<FaSearch />
				</button>
			</motion.div>

			{activeSearch.length > 0 && (
				<div className="absolute top-20 p-2 bg-teal-400 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
					{activeSearch.map((result, index) => (
						<div
							key={index}
							className="flex flex-col hover:bg-teal-300 p-1 rounded-md hover:shadow-sm">
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
											<div className="lg:w-1/2 h-5/6 lg:h-auto">
												<div className="flex flex-wrap lg:items-center">
													<div className="w-1/2">
														<img
															src={result.cover}
															alt=""
														/>
													</div>
													<div
														className="lg:w-1/2 p-12 overflow-y-scroll"
														style={{
															maxHeight:
																"calc(80vh - 3rem)",
														}}>
														<h2 className="capitalize lg:text-3xl text-teal-800 font-bold mt-5">
															{result.title}
														</h2>
														<p className="font-thin italic capitalize">
															{result.author}
														</p>
														<p className="font-thin italic capitalize  mb-5">
															{result.genre}
														</p>
														<p className="mb-5 lg:text-md">
															{result.description}
														</p>
														<button className="mb-5 py-1 bg-red-500 text-sm lg:px-4 lg:py-2 lg:text-xl text-white">
															Read
														</button>
													</div>
												</div>
											</div>
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
