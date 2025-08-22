import { useState, useRef, useEffect } from "react";
import DiabondBtn from "./DiabondBtn";

const Accordion = ({
  number = "01",
  name = "",
  description = "",
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  onButtonClick,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight + "px");
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  const toggle = () => {
    if (typeof onToggle === "function") {
      onToggle(!isOpen);
    } else {
      setInternalOpen((v) => !v);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className="w-[60px] h-[60px] flex-shrink-0 flex items-center justify-center overflow-visible">
        <DiabondBtn 
          number={number} 
          pushed={isOpen}
          noScale={true}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <button
          type="button"
          onClick={() => {
            toggle();
            if (onButtonClick) {
              onButtonClick(number);
            }
          }}
          aria-expanded={isOpen}
          className="text-left w-full "
        >
          <span
            className={`text-[24px] sm:text-[28px] leading-snug text-white transition-colors duration-300 break-words whitespace-normal ${
              isOpen ? "font-bold" : "font-semibold"
            }`}
          >
            {name}
          </span>
        </button>


        <div
          ref={contentRef}
          style={{ maxHeight }}
          className="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="mt-3">
            <hr className="border-t border-gray-600" />
            <div className="mt-3 text-[18px] sm:text-[20px] leading-snug font-medium text-gray-300 break-words whitespace-normal">
              {description || "\u00A0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
