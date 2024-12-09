import { useState } from "react";
import { BOOKS } from "../words";
import Search from "../component/Search";
import Popup from "../component/Popup";
import { motion } from "framer-motion";

const getFilteredItems = (query, items) => {
	if (!query) {
		return items;
	}

	return items.filter(
		(item) =>
			item.title.toLowerCase().includes(query.toLowerCase()) ||
			item.author.toLowerCase().includes(query.toLowerCase()) ||
			item.genre.toLowerCase().includes(query.toLowerCase())
	);
};

const Books = () => {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [selectedBook, setSelectedBook] = useState(null);
	const filteredItems = getFilteredItems(query, BOOKS);

	const handleClosePopup = () => {
		setOpen(false);
		setSelectedBook(null);
	};

	return (
		<div className="py-10">
			<div className="flex justify-center items-center mx-auto lg:my-6 flex-col w-full h-full">
				<Search setQuery={setQuery} />
			</div>

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
								setSelectedBook(book);
								setOpen(true);
							}}>
							<div className="w-full h-auto">
								<img
									src={book.cover}
									alt={book.title}
									className="h-full w-auto object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								/>
							</div>
							<div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>

							<div
								className="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0"
								style={{
									color: book.textColor,
									textShadow: `0 0 4px ${book.textColor}`,
								}}>
								<h1 className="font-dmserif text-xl lg:text-3xl font-bold capitalize">
									{book.title}
								</h1>
								<p className="mb-3 text-sm lg:text-lg italic opacity-0 transition-opacity duration-300 group-hover:opacity-100 capitalize">
									<span className="font-thin">
										{book.genre.length > 1
											? book.genre.join(", ")
											: book.genre}
									</span>
								</p>
							</div>
						</motion.div>
					))
				) : (
					<h1 className="text-center font-semibold text-2xl col-span-full">
						No results found
					</h1>
				)}
			</div>

			<Popup open={open} onClose={handleClosePopup} page="books">
				{selectedBook && (
					<div>
						{selectedBook.bgColor.map((bgColor, index) => (
							<div
								key={index}
								className="book-background flex flex-wrap lg:items-center"
								style={{
									"--bg-color-default": bgColor.lg,
									"--bg-color-mobile": bgColor.sm,
								}}>
								<div className="lg:w-1/2">
									<img src={selectedBook.cover} alt="" />
								</div>
								<div
									className="lg:w-1/2 p-12 overflow-y-scroll scroll-hidden"
									style={{ maxHeight: "calc(80vh - 3rem)" }}>
									<h2
										className="capitalize lg:text-3xl font-bold mt-5"
										style={{
											color: selectedBook.textColor,
										}}>
										{selectedBook.title}
									</h2>
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
									<p
										className="font-semibold italic capitalize lg:text-xl mb-5"
										style={{
											color: selectedBook.textColor,
										}}>
										Genre:{" "}
										<span className="font-thin">
											{selectedBook.genre.length > 1
												? selectedBook.genre.join(", ")
												: selectedBook.genre}
										</span>
									</p>
									<p
										className="mb-5 text-sm lg:text-md"
										style={{
											color: selectedBook.textColor,
										}}>
										{selectedBook.description}
									</p>
									<button className="py-2 px-6 bg-teal-500 text-white rounded-lg text-md lg:text-lg shadow hover:bg-teal-600">
										Read
									</button>
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
