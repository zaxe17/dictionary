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
                genre.toLowerCase().startsWith(query.toLowerCase())
            )
    );
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
                            }}
                        >
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
                                }}
                            >
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
                                className="book-background flex flex-wrap lg:items-center"
                                style={{
                                    "--bg-color-default": bgColor.lg,
                                    "--bg-color-mobile": bgColor.sm,
                                }}
                            >
                                {/* BOOK COVER */}
                                <div className="lg:w-1/2 mx-auto">
                                    <img
                                        src={selectedBook.cover}
                                        alt={selectedBook.title}
                                    />
                                </div>

                                {/* DISPLAY TITLE, AUTHOR, GENRE, DESCRIPTION */}
                                <div
                                    className="lg:w-1/2 my-5 p-12 overflow-y-hidden scroll-hidden"
                                    style={{
                                        maxHeight: "calc(80vh - 3rem)",
                                    }}
                                >
                                    {/* BOOK TITLE */}
                                    <h2
                                        className="capitalize lg:text-4xl font-bold"
                                        style={{
                                            color: selectedBook.textColor,
                                        }}
                                    >
                                        {selectedBook.title}
                                    </h2>

                                    {/* AUTHOR */}
                                    <p
                                        className="font-semibold italic capitalize lg:text-xl"
                                        style={{
                                            color: selectedBook.textColor,
                                        }}
                                    >
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
                                        }}
                                    >
                                        Genre:{" "}
                                        <span className="font-thin">
                                            {selectedBook.genre.join(", ")}
                                        </span>
                                    </p>

                                    {/* DESCRIPTION */}
                                    <div
                                        className="overflow-y-scroll scroll-hidden my-2"
                                        style={{
                                            maxHeight: "calc(65vh - 12rem)",
                                        }}
                                    >
                                        <p
                                            className="mb-5 text-sm lg:text-base break-words"
                                            style={{
                                                color: selectedBook.textColor,
                                            }}
                                        >
                                            {selectedBook.description}
                                        </p>
                                    </div>

                                    {/* BUTTON */}
                                    <button className="py-2 px-6 bg-teal-500 text-white rounded-lg text-base lg:text-lg shadow hover:bg-teal-600">
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
