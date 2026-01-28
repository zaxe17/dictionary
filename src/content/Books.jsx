import { useState } from "react";
import { BOOKS } from "../const";
import Popup from "../component/Popup";
import { motion } from "framer-motion";

/* GET THE ITEMS FOR SEARCHBAR */
const getFilteredItems = (query, items) => {
	if (!query) {
		return items;
	}

	/* SEARCHING THE ITEMS IN BOOKS (TITLE, AUTHOR, GENRE) */
	return items.filter(
		(item) =>
			item.title.toLowerCase().startsWith(query.toLowerCase()) ||
			item.author.toLowerCase().startsWith(query.toLowerCase()) ||
			item.genre.some((genre) =>
				genre.toLowerCase().startsWith(query.toLowerCase()),
			),
	);
};

const hexToRgba = (hex, alpha = 0.1) => {
	// Remove '#' if it exists
	hex = hex.replace("#", "");

	// Parse r, g, b
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Books = ({ query }) => {
	const [open, setOpen] = useState(false);
	const [selectedBook, setSelectedBook] = useState(null);
	const filteredItems = getFilteredItems(query, BOOKS);

	/* HANDLE POPUP CLOSE AND OPEN */
	const handletogglePopup = () => {
		setOpen(false);
		setSelectedBook(null);
	};

	return (
		<div className="py-10">
			{/* DISPLAY OBJECT IN BOOKS */}
			<div className="grid grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-4 pt-10 select-none">
				{filteredItems.length > 0 ? (
					filteredItems.map((book, index) => (
						<motion.div
							whileInView={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 50 }}
							transition={{ duration: 1 }}
							key={index}
							className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-lg"
							onClick={() => {
								/* SELECTED CARD CLICKED, POPUP SHOWN AND DISPLAY THE CONTENT */
								setSelectedBook(book);
								setOpen(true);
							}}>
							{/* DISPLAY BOOK COVER */}
							<div className="w-full h-full">
								<img
									src={book.cover}
									alt={book.title}
									className="h-full w-auto object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								/>
							</div>

							{/* TRANSPARENT BACKGROUND FOR HOVER EFFECT */}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>

							{/* DISPLAY BOOK TITLE AND AUTHOR */}
							<div
								className="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 text-white"
								style={{
									textShadow: "0 0 4px rgb(255, 255, 255)",
								}}>
								{/* BOOK TITLE */}
								<h1 className="font-dmserif text-xl lg:text-3xl font-bold capitalize">
									{book.title}
								</h1>

								{/* AUTHOR */}
								<p className="mb-3 text-sm lg:text-lg italic opacity-0 transition-opacity duration-300 group-hover:opacity-100 capitalize">
									<span className="font-thin">
										{book.author}
									</span>
								</p>
							</div>
						</motion.div>
					))
				) : (
					/* DISPLAY IF THE FILTEREDITEMS OR SEARCH ARE NULL */
					<h1 className="text-center font-semibold text-2xl col-span-full">
						No results found
					</h1>
				)}
			</div>

			{/* POPUP COMPONENT */}
			<Popup open={open} onClose={handletogglePopup} page="books">
				{selectedBook && (
					<div>
						{selectedBook.bgColor.map((bgColor, index) => (
							<div
								key={index}
								className="book-background flex flex-wrap lg:items-stretch"
								style={{
									"--bg-color-default": bgColor.lg,
									"--bg-color-mobile": bgColor.sm,
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
												{selectedBook.genre.join(", ")}
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
		</div>
	);
};

export default Books;
