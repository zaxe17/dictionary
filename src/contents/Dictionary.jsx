import { WORDS } from "../words";

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

    return (
		<div className="capitalize pt-10">
			{filteredItems.length > 0 ? (
				filteredItems.map((words, index) => (
					<div key={index}>
						<h1 className="font-bold text-4xl pl-4">{words.letter}</h1>
						<div className="border-b border-neutral-900 pb-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
											className="w-50 h-60 rounded-2xl shadow-2xl flex flex-col m-[0.5rem] bg-teal-100">
											<h2 className="font-semibold text-2xl m-3 border-b border-teal-600 pb-4">
												{descript.word}
											</h2>
											<p className="pb-5 m-3">
												{descript.desc}
											</p>
										</div>
									))}
							</div>
						</div>
					</div>
				))
			) : (
				<p>No results found</p>
			)}
		</div>
	);
};

export default Dictionary;
