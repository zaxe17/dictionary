import { useState } from "react";
import { WORDS } from "../words";
import Popup from "./Popup";

const getFilteredItems = (query, items) => {
	if (!query) {
		return items;
	}

	return items.filter((item) =>
		item.description.some((desc) =>
			desc.word.toLowerCase().includes(query.toLowerCase())
		)
	);
};

const Dictionary = ({ query }) => {
	const filteredItems = getFilteredItems(query, WORDS);
	const [open, setOpen] = useState(false);
	const [selectedWord, setSelectedWord] = useState(null);

	return (
		<div className="pt-10">
			{filteredItems.length > 0 ? (
				filteredItems.map((words, index) => (
					<div key={index}>
						<h1 className="capitalize font-bold text-4xl pl-4 pb-3">
							{words.letter}
						</h1>
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
										<div
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
										</div>
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

			{open && selectedWord && (
				<Popup open={open} onClose={() => setOpen(false)}>
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
									className="lg:text-xl break-words overflow-y-scroll pb-5">
									{desc}
								</li>
							))}
						</ol>
					</div>
				</Popup>
			)}
		</div>
	);
};

export default Dictionary;
