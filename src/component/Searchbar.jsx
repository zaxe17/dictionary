import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { WORDS, BOOKS } from "../const";
import Popup from "./Popup";
import { motion } from "framer-motion";

/* HELPER FUNCTION */
const hexToRgba = (hex, alpha = 0.3) => {
	hex = hex.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* HOME CONTENT SEARCHBAR TO DISPLAY BOOKS DICTIONARY IN SEARCHBAR */
const Searchbar = () => {
	const [activeSearch, setActiveSearch] = useState([]);
	const [selectedWord, setSelectedWord] = useState(null);
	const [selectedBook, setSelectedBook] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupType, setPopupType] = useState(null); // 'word' or 'book'
	const searchBarRef = useRef(null);
	const inputRef = useRef(null);

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
					desc.word.toLowerCase().startsWith(searchQuery),
				)
				.map((desc) => ({
					type: "word",
					word: desc.word,
					pronounce: desc.pronounce,
					desc: desc.desc,
				})),
		).flat();

		/* SEARCHING COVER, TITLE, AUTHOR, GENRE, DESCRIPTION */
		const filteredBooks = BOOKS.filter((book) =>
			book.title.toLowerCase().includes(searchQuery),
		).map((book) => ({
			type: "book",
			cover: book.cover,
			title: book.title,
			author: book.author,
			genre: book.genre,
			description: book.description,
			bgColor: book.bgColor,
			textColor: book.textColor,
		}));

		/* COMBINED BOOKS AND WORDS */
		const combinedResults = [...filteredWords, ...filteredBooks].slice(
			0,
			8,
		);

		setActiveSearch(combinedResults);
	};

	/* HANDLE CLICK ON SEARCH RESULT */
	const handleResultClick = (result) => {
		if (result.type === "word") {
			setSelectedWord(result);
			setPopupType("word");
		} else {
			setSelectedBook(result);
			setPopupType("book");
		}
		setIsPopupOpen(true);
		setActiveSearch([]); // Clear search results
	};

	/* CLOSE POPUP */
	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setSelectedWord(null);
		setSelectedBook(null);
		setPopupType(null);
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

		const handleSlashKey = (e) => {
			if (
				e.key === "/" &&
				document.activeElement.tagName !== "INPUT" &&
				document.activeElement.tagName !== "TEXTAREA"
			) {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", handleSlashKey);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", handleSlashKey);
		};
	}, []);

	return (
		<>
			<form
				ref={searchBarRef}
				className="w-[300px] lg:w-[500px] relative">
				<motion.div
					whileInView={{ width: "100%" }}
					initial={{ width: "11%" }}
					transition={{ duration: 1 }}
					className="relative">
					{/* INPUT FOR SEARCHBAR */}
					<input
						ref={inputRef}
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
					<div className="absolute top-20 p-2 bg-teal-400 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
						{/* DISPLAY WORDS AND BOOKS ABOVE OF SEARCHBAR */}
						{activeSearch.map((result, index) => (
							<div
								key={index}
								onClick={() => handleResultClick(result)}
								className="flex flex-col hover:bg-teal-300 p-2 rounded-md hover:shadow-sm cursor-pointer">
								<span className="text-teal-900 font-semibold">
									{result.word ? (
										<>Word: {result.word}</>
									) : (
										<>Book: {result.title}</>
									)}
								</span>
							</div>
						))}
					</div>
				)}
			</form>

			{/* POPUP COMPONENT FOR WORDS */}
			{popupType === "word" && (
				<Popup
					open={isPopupOpen}
					onClose={handleClosePopup}
					page="dictionary">
					{selectedWord && (
						<div className="w-fit mx-auto my-4 max-w-full">
							<div className="sticky top-0 z-10 bg-teal-200">
								{/* WORD */}
								<h1 className="text-teal-600 text-center capitalize text-5xl font-bold mb-2">
									{selectedWord.word}
								</h1>

								{/* PRONOUNCE */}
								<p className="text-teal-700 text-center text-md italic mb-4 border-b border-teal-600 pb-2">
									[ {selectedWord.pronounce} ]
								</p>
							</div>

							{/* DESCRIPTION */}
							<ul className="list-disc list-inside">
								{selectedWord.desc.map((desc, index) => (
									<li
										key={index}
										className="text-teal-900 lg:text-xl break-words overflow-y-scroll pb-5 scroll-hidden">
										{desc}
									</li>
								))}
							</ul>
						</div>
					)}
				</Popup>
			)}

			{/* POPUP COMPONENT FOR BOOKS */}
			{popupType === "book" && (
				<Popup
					open={isPopupOpen}
					onClose={handleClosePopup}
					page="books">
					{selectedBook && selectedBook.bgColor && (
						<div>
							{selectedBook.bgColor.map((bgColor, index) => (
								<div
									key={index}
									className="book-background flex flex-wrap lg:items-stretch"
									style={{
										"--bg-color-default": hexToRgba(
											bgColor.lg,
											0.3,
										),
										"--bg-color-mobile": hexToRgba(
											bgColor.sm,
											0.3,
										),
									}}>
									{/* BOOK COVER */}
									<div className="lg:w-1/2 lg:h-[80vh] mx-auto overflow-hidden">
										<img
											src={selectedBook.cover}
											alt={selectedBook.title}
											className="h-full w-full object-cover"
										/>
									</div>

									{/* DISPLAY TITLE, AUTHOR, GENRE, DESCRIPTION */}
									<div className="relative lg:w-1/2 lg:h-[80vh] overflow-hidden">
										<div className="absolute inset-0 w-full overflow-hidden">
											<img
												src={selectedBook.cover}
												alt={selectedBook.title}
												className="h-full w-full object-cover"
											/>
										</div>

										<div
											className="bg-black/20 relative w-full h-full px-12 py-8 z-10 backdrop-blur-2xl overflow-y-auto scroll-hidden"
											style={{
												"--bg-color-default": hexToRgba(
													bgColor.lg,
													0.1,
												),
												"--bg-color-mobile": hexToRgba(
													bgColor.sm,
													0.1,
												),
												boxShadow:
													"0 4px 30px rgba(0, 0, 0, 0.3)",
											}}>
											{/* BOOK TITLE */}
											<h2
												className="capitalize lg:text-4xl font-bold"
												style={{
													color: selectedBook.textColor,
												}}>
												{selectedBook.title}
											</h2>

											{/* AUTHOR */}
											<p
												className="font-semibold italic capitalize lg:text-xl"
												style={{
													color: selectedBook.textColor,
												}}>
												Author:{" "}
												<span className="font-thin">
													{selectedBook.author}
												</span>
											</p>

											{/* GENRE */}
											<p
												className="font-semibold italic capitalize lg:text-sm mb-5"
												style={{
													color: selectedBook.textColor,
												}}>
												Genre:{" "}
												<span className="font-thin">
													{selectedBook.genre.join(
														", ",
													)}
												</span>
											</p>

											{/* DESCRIPTION */}
											<p
												className="mb-5 text-sm lg:text-base break-words"
												style={{
													color: selectedBook.textColor,
												}}>
												{selectedBook.description}
											</p>

											{/* BUTTON */}
											<button className="py-2 px-6 bg-teal-500 text-white rounded-lg text-base lg:text-lg shadow hover:bg-teal-600">
												Read
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</Popup>
			)}
		</>
	);
};

export default Searchbar;
