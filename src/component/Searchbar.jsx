import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { WORDS, BOOKS } from "../words";
import Popup from "./Popup";
import { motion } from "framer-motion";

/* HOME CONTENT SEARCHBAR TO DISPLAY BOOKS DICTIONARY IN SEARCHBAR */
const Searchbar = () => {
	const [activeSearch, setActiveSearch] = useState([]);
	const [popupContent, setPopupContent] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const searchBarRef = useRef(null);

	/* HANDLE ITEMS IN BOOKS AND WORDS */
	const handleSearch = (e) => {
		const searchQuery = e.target.value.toLowerCase();

		if (searchQuery === "") {
			setActiveSearch([]);
			return;
		}

		/* SEARCHING FOR WORDS */
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

		/* SEARCHING COVER, TITLE, AUTHOR, GENRE, DESCRIPTION */
		const filteredBooks = BOOKS.filter((book) =>
			book.title.toLowerCase().includes(searchQuery)
		).map((book) => ({
			cover: book.cover,
			title: book.title,
			author: book.author,
			genre: book.genre,
			desc: book.description,
		}));

		/* COMBINED BOOKS AND WORDS */
		const combinedResults = [...filteredWords, ...filteredBooks].slice(
			0,
			8
		);

		setActiveSearch(combinedResults);
	};

	/* OPEN AND CLOSE POPUP COMPONENT */
	const togglePopup = (content) => {
		setPopupContent(content);
		setIsPopupOpen(!!content);
	};

	/* HANDLE HIDE SEARCH CONTENT */
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

				{/* INPUT FOR SEARCHBAR */}
				<input
					type="search"
					placeholder="Search..."
					className="w-full h-9 lg:h-full p-4 rounded-full bg-teal-400 shadow-xl outline-none placeholder-teal-700 focus:text-white text-teal-900"
					onChange={(e) => handleSearch(e)}
				/>

				{/* BUTTON FOR SEARCHBAR */}
				<button className="absolute h-auto w-auto right-[0.15rem] lg:right-1 top-1/2 -translate-y-1/2 p-2 lg:p-4 text-teal-900 bg-teal-500 rounded-full flex justify-center items-center">
					<FaSearch />
				</button>
			</motion.div>

			{/* SHOW RESULT ITEMS BASE ON USERS INPUT */}
			{activeSearch.length > 0 && (
				<div className="absolute top-20 p-2 bg-teal-400 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">

					{/* DISPLAY WORDS AND BOOKS ABOVE OF SEARCHBAR */}
					{activeSearch.map((result, index) => (
						<div
							key={index}
							className="flex flex-col hover:bg-teal-300 p-1 rounded-md hover:shadow-sm">
							{result.word ? (
								/* WORDS POPUP */
								<span
									className="font-bold cursor-pointer"
									onClick={() =>
										togglePopup(
											<div className="w-fit mx-auto my-4 max-w-full">
												<div className="sticky top-0 z-10">

													{/* WORDS */}
													<h1 className="text-teal-600 text-center capitalize text-5xl font-bold mb-2">
														{result.word}
													</h1>

													{/* PRONOUNCE */}
													<p className="text-teal-700 text-center text-md italic mb-4 border-b border-teal-600 pb-2">
														[ {result.pronounce} ]
													</p>
												</div>

												{/* DESCRIPTION */}
												<ul className="list-disc list-inside">
													{result.desc.map(
														(desc, index) => (
															<li
																key={index}
																className="text-teal-900 lg:text-xl break-words overflow-y-scroll pb-5 scroll-hidden">
																{desc}
															</li>
														)
													)}
												</ul>
											</div>
										)
									}>
									Dictionary: {result.word}
								</span>
							) : (
								/* BOOKS POPUP */
								<span
									className="font-bold cursor-pointer"
									onClick={() =>
										togglePopup(
											<div className="scroll-hidden">
												<div className="flex flex-wrap lg:items-center">

													{/* BOOKS COVER */}
													<div className="w-1/2">
														<img
															src={result.cover}
															alt=""
														/>
													</div>
													
													{/* BOOKS DETAILS */}
													<div
														className="lg:w-1/2 p-12 overflow-y-scroll"
														style={{
															maxHeight:
																"calc(80vh - 3rem)",
														}}>

														{/* BOOKS TITLE */}
														<h2 className="capitalize lg:text-3xl text-teal-800 font-bold mt-5">
															{result.title}
														</h2>

														{/* AUTHOR */}
														<p className="font-thin italic capitalize">
															{result.author}
														</p>

														{/* GENRE */}
														<p className="font-thin italic capitalize  mb-5">
															{result.genre}
														</p>

														{/* DESCRIPTION */}
														<p className="mb-5 lg:text-md">
															{result.desc}
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

			{/* POPUP COMPONENT */}
			<Popup
				open={isPopupOpen}
				onClose={() => togglePopup(null)}
				page="search">
				{popupContent}
			</Popup>
		</form>
	);
};

export default Searchbar;
