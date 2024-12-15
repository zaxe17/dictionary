import { useEffect } from "react";

const Popup = ({ open, onClose, children, page }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

	/* POPUP STYLES IN BOOKS AND WORDS */
    const bodyStyle = () => {
        if (page === "dictionary" || page === "search") {
            return "bg-teal-200 p-10 max-w-[95%] lg:max-w-[40%] min-w-[90%] lg:min-w-[20%] h-3/4 lg:h-1/2";
        } else if (page === "books" || page === "search") {
            return "m-2 lg:w-1/2 h-5/6 lg:h-auto overflow-hidden";
        }
    };

	/* POPUP BODY */
    return (
		<div
			className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
				open ? "visible bg-black/50" : "invisible"
			}`}
			onClick={onClose}>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-xl transition-all ${bodyStyle()} ${
					open ? "scale-100 opacity-100" : "scale-125 opacity-0"
				}`}>

				{/* EX BUTTON */}
				<button
					className="absolute top-0 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-600 text-2xl"
					onClick={onClose}>
					<span className="font-bold">X</span>
				</button>

				{/* DISPLAY THE CONTENT FROM POPUP IN BOOKS AND DICTIONARY */}
				<div className="overflow-y-scroll h-full scroll-hidden">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Popup;
