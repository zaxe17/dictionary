import { FaCompressArrowsAlt } from "react-icons/fa";
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

	const sizePage = () => {
		if (page === "dictionary") {
			return "bg-teal-100 shadow p-10 transition-all max-w-[95%] lg:max-w-[40%] min-w-[90%] lg:min-w-[20%] h-3/4 lg:h-1/2";
		} else if (page === "books") {
			return "bg-teal-100 lg:w-1/2 h-5/6 lg:h-auto";
		}
		return "";
	};

	return (
		<div
			className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
				open ? "visible bg-black/30" : "invisible"
			}`}
			onClick={onClose}>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-xl ${sizePage()} ${
					open ? "scale-100 opacity-100" : "scale-125 opacity-0"
				}`}>
				<button
					className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-600 text-2xl"
					onClick={onClose}>
					<FaCompressArrowsAlt />
				</button>
				<div className="overflow-y-scroll h-full scroll-hidden">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Popup;
