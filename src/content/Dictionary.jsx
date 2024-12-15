import { useState } from "react";
import { WORDS } from "../const";
import Popup from "../component/Popup";
import { motion } from "framer-motion";
import Search from "../component/Search";

/* GET THE ITEMS FOR SEARCHBAR */
const getFilteredItems = (query, items) => {
	if (!query) {
		return items;
	}

	/* SEARCHING THE ITEMS IN WORDS */
	return items.filter((item) =>
		item.description.some((desc) =>
			desc.word.toLowerCase().startsWith(query.toLowerCase())
		)
	);
};

const Dictionary = () => {
	const [query, setQuery] = useState("");
	const filteredItems = getFilteredItems(query, WORDS);
	const [open, setOpen] = useState(false);
	const [selectedWord, setSelectedWord] = useState(null);

	/* HANDLE POPUP CLOSE AND OPEN */
	const handleClosePopup = () => {
		setOpen(false);
		setSelectedWord(null);
	};

	return (
		<div className="pt-10">

			{/* SEARCH COMPONENT */}
			<div className="flex justify-center items-center mx-auto lg:my-6 flex-col w-full h-full">
				<Search setQuery={setQuery} />
			</div>

			{/* DISPLAY OBJECT IN DICTIONARY */}
			{filteredItems.length > 0 ? (
				filteredItems.map((words, index) => (
					<div key={index} className="pt-10">

						{/* DISPLAY LETTER OBJECT IN WORDS */}
						<motion.h1
							whileInView={{ opacity: 1 }}
							initial={{ opacity: 0 }}
							transition={{ duration: 1 }}
							className="capitalize font-bold text-5xl pl-4 pb-3 text-teal-100"
							style={{
								textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
							}}>
							{words.letter}
						</motion.h1>
						
						{/* DISPLAY THE OBJECT (WORD, PRONOUNCE, DESC) IN DESCRIPTION */}
						<div className="border-b border-teal-600 pb-4 break-words">
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
								{words.description
									.filter((desc) =>
										desc.word
											.toLowerCase()
											.includes(query.toLowerCase())
									)
									.sort((a, b) =>
										a.word.localeCompare(b.word)
									)
									.map((descript, index) => (
										/* CONTENT CARD */
										<motion.div
											whileInView={{ opacity: 1, y: 0 }}
											initial={{ opacity: 0, y: 50 }}
											transition={{ duration: 1 }}
											key={index}
											className="h-48 lg:h-60 rounded-2xl shadow-md flex flex-col lg:m-[0.5rem] bg-teal-200 hover:bg-teal-100 transition-colors duration-200 ease-in-out cursor-pointer p-3 group"
											onClick={() => { /* SELECTED CARD CLICKED, POPUP SHOWN AND DISPLAY THE CONTENT */
												setSelectedWord(descript);
												setOpen(true);
											}}>
												
											{/* WORD */}
											<h2 className="capitalize font-semibold text-teal-800 group-hover:text-teal-600 transition-colors duration-200 ease-in-out text-md lg:text-3xl pt-4">
												{descript.word}
											</h2>

											{/* PRONOUNCE */}
											<span className="text-teal-700 text-sm lg:text-lg border-b border-teal-600 pb-2 italic">
												[ {descript.pronounce} ]
											</span>

											{/* DISPLAY THE OBJECT IN DESC */}
											<ul className="list-disc list-inside text-sm lg:text-xl m-3 overflow-y-scroll scroll-hidden">
												{descript.desc.map(
													(
														description,
														descIndex
													) => (
														<li
															key={descIndex}
															className="text-teal-900 break-words pb-3">
															{description}
														</li>
													)
												)}
											</ul>
										</motion.div>
									))}
							</div>
						</div>
					</div>
				))
			) : (
				/* DISPLAY IF THE SEARCHBAR OR FILTEREDITEMS IS NULL */
				<h1 className="text-center font-semibold text-2xl">
					No results found
				</h1>
			)}

			{/* POPUP COMPONENT */}
			<Popup open={open} onClose={handleClosePopup} page="dictionary">

				{/* DISPLAY THE SELECTED WORD */}
				{selectedWord && (
					<div className="w-fit mx-auto my-4 max-w-full">
						<div className="sticky top-0 z-10">

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
		</div>
	);
};

export default Dictionary;
