import { useState } from "react";

function ImageButton({ defaultImg, activeImg, type, className }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (type === "temporary") {
      setActive(true);
      setTimeout(() => setActive(false), 200);
    } else {
      setActive((prev) => !prev);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={[
        "border-none bg-transparent cursor-pointer button-hover",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img src={active ? activeImg : defaultImg} alt="button" />
    </button>
  );
}

export default ImageButton;
