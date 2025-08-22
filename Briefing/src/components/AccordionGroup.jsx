import { useState } from "react";
import Accordion from "./Accordion";

const AccordionGroup = ({ items = [], onButtonClick }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div
      className="flex flex-col gap-6 w-full max-w-[550px] max-h-screen overflow-y-auto"
    >
      {items.map((item, index) => (
        <Accordion
          key={index}
          number={item.number}
          name={item.name}
          description={item.description}
          isOpen={openIndex === index}
          onToggle={(next) => setOpenIndex(next ? index : null)}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  );
};

export default AccordionGroup;
