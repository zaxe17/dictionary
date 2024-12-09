import { FaCompressArrowsAlt } from "react-icons/fa";
import { useEffect } from "react";

const Popup = ({ open, onClose, children }) => {
  // Lock/Unlock scrolling on the body when the popup is opened or closed
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll
    }

    // Cleanup: Reset the scroll behavior when the component unmounts or the popup closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/30" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-teal-100 rounded-xl shadow p-10 transition-all max-w-[95%] lg:max-w-[40%] min-w-[90%] lg:min-w-[20%] h-3/4 lg:h-1/2 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          <FaCompressArrowsAlt />
        </button>
        <div className="overflow-y-scroll h-full">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
