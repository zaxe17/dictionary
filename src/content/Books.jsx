import { useState } from "react";
import { BOOKS } from "../words";
import { motion } from "framer-motion";
import Search from "../component/Search";

const getFilteredItems = (query, items) => {
	if (!query) {
		return items;
	}

	return items.filter((item) =>
		item.title.toLowerCase().includes(query.toLowerCase()) || 
		item.author.toLowerCase().includes(query.toLowerCase()) ||
		item.genre.toLowerCase().includes(query.toLowerCase()) ||
		item.description.toLowerCase().includes(query.toLowerCase())
	);
};

const Books = () => {
	const [query, setQuery] = useState("");
    const filteredItems = getFilteredItems(query, BOOKS);
	/* const [selectedBook, setSelectedBook] = useState(null); */

    return (
		<div className="pt-10">
			<div className="flex justify-center items-center mx-auto lg:my-6 flex-col w-full h-full">
				<Search setQuery={setQuery} />
			</div>
			{filteredItems.length > 0 ? (
				filteredItems.map((book, index) => (
					<div key={index} className="pt-10">
						<div className="border-b border-teal-400 pb-4 break-words">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
								<motion.div
									whileInView={{ opacity: 1, y: 0 }}
									initial={{ opacity: 0, y: 60 }}
									transition={{ duration: 1 }}
									key={index}
									className="h-48 lg:h-60 rounded-2xl shadow-xl flex flex-col lg:m-[0.5rem] bg-teal-100 cursor-pointer p-3">
									<h2 className="capitalize font-semibold text-md lg:text-3xl pt-4">
										{book.title}
									</h2>
									<span className="text-sm capitalize lg:text-lg pb-2">
										{book.author}
									</span>
									<span className="text-sm lg:text-lg border-b border-teal-600 pb-2">
										{book.genre}
									</span>
									<p className="text-sm lg:text-lg m-3 overflow-y-scroll scroll-hidden">
										{book.description}
									</p>
								</motion.div>
							</div>
						</div>
					</div>
				))
			) : (
				<h1 className="text-center font-semibold text-2xl">
					No results found
				</h1>
			)}

			{/* {selectedBook && (
				<div className="mt-10 p-5 border border-teal-500 rounded-lg bg-teal-50">
					<h1 className="text-center capitalize text-3xl font-bold mb-2">
						{selectedBook.title}
					</h1>
					<p className="text-center text-lg italic mb-4">
						by {selectedBook.author}
					</p>
					<p className="text-center text-md mb-4">{selectedBook.genre}</p>
					<p className="lg:text-xl break-words overflow-y-scroll pb-5 scroll-hidden">
						{selectedBook.description}
					</p>
				</div>
			)} */}
		</div>
	);
};

export default Books;
