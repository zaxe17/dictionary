import { useState } from "react";
import { WORDS } from "../words";
import Popup from "./Popup";
import { motion } from "framer-motion";
import Search from "../component/Search";

const getFilteredItems = (query, items) => {
    if (!query) {
        return items;
    }

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

    const handleClosePopup = () => {
        setOpen(false);
        setSelectedWord(null);
    };

    return (
		<div className="pt-10">
			<div className="flex justify-center items-center mx-auto lg:my-6 flex-col w-full h-full">
				<Search setQuery={setQuery} />
			</div>

			{filteredItems.length > 0 ? (
				filteredItems.map((words, index) => (
					<div key={index} className="pt-10">
						<motion.h1
							whileInView={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 60 }}
							transition={{ duration: 0.5 }}
							className="capitalize font-bold text-4xl pl-4 pb-3">
							{words.letter}
						</motion.h1>
						<div className="border-b border-teal-400 pb-4 break-words">
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
										<motion.div
											whileInView={{ opacity: 1, y: 0 }}
											initial={{ opacity: 0, y: 60 }}
											transition={{ duration: 1 }}
											key={index}
											className="h-48 lg:h-60 rounded-2xl shadow-2xl flex flex-col lg:m-[0.5rem] bg-teal-100 cursor-pointer p-3"
											onClick={() => {
												setSelectedWord(descript);
												setOpen(true);
											}}>
											<h2 className="capitalize font-semibold text-md lg:text-3xl pt-4">
												{descript.word}
											</h2>
											<span className="text-sm lg:text-lg border-b border-teal-600 pb-2 italic">
												[ {descript.pronounce} ]
											</span>
											<ol className="list-decimal list-inside text-sm lg:text-xl m-3 overflow-y-scroll scroll-hidden">
												{descript.desc.map(
													(
														description,
														descIndex
													) => (
														<li
															key={descIndex}
															className="break-words pb-3">
															{description}
														</li>
													)
												)}
											</ol>
										</motion.div>
									))}
							</div>
						</div>
					</div>
				))
			) : (
				<h1 className="text-center font-semibold text-2xl">
					No results found
				</h1>
			)}

			<Popup open={open} onClose={handleClosePopup}>
				{selectedWord && (
					<div className="w-fit mx-auto my-4 max-w-full">
						<div className="sticky top-0 bg-teal-100 z-10">
							<h1 className="text-center capitalize text-5xl font-bold mb-2">
								{selectedWord.word}
							</h1>
							<p className="text-center text-md italic mb-4 border-b border-teal-600 pb-2">
								[ {selectedWord.pronounce} ]
							</p>
						</div>
						<ol className="list-decimal list-inside">
							{selectedWord.desc.map((desc, index) => (
								<li
									key={index}
									className="lg:text-xl break-words overflow-y-scroll pb-5 scroll-hidden">
									{desc}
								</li>
							))}
						</ol>
					</div>
				)}
			</Popup>
		</div>
	);
};

export default Dictionary;
