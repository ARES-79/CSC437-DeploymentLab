import { useRef } from "react";

function Modal({ headerLabel, isOpen, onCloseRequested, children }){
    const innerDivRef = useRef(null);

    function handleClickOutside(event) {
        if (innerDivRef.current && !innerDivRef.current.contains(event.target)) {
            onCloseRequested(); // Close modal if clicked outside
        }
    }
    return (
        isOpen &&
        <div className="fixed inset-0 w-full h-full bg-gray-500/30 flex items-center justify-center"
            onClick={handleClickOutside}>
            <div ref={innerDivRef}
                className="bg-white p-6 rounded-lg shadow-lg"> 
            <header className="flex items-center justify-between pb-3">
                <h2 className="text-lg font-semibold">{headerLabel}</h2>
                <button aria-label="Close" className="text-xl font-bold text-gray-600 hover:text-black"
                 onClick={onCloseRequested}>
                    &times;
                </button>
            </header>
                {children}
            </div>
        </div>
    );
}

export default Modal;
