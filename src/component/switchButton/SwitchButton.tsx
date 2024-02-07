import { FC, useState, memo } from "react";
import switchButtonProps from "./type";
import "./style.css";
export const SwitchButton: FC<switchButtonProps> = memo(
  ({ containerClassName, list, active, itemsClass }) => {
    const [select, setSelect] = useState<number>(active);
    const handleClick = (inx: number, onClick: () => void) => {
      setSelect(inx);
      onClick();
    };
    return (
      <section className={containerClassName}>
        <ul className="switch-button ">
          {list.map((elm, inx) => (
            <li
              key={`switch-${inx}`}
              className={`${
                inx === select && "bg-primary"
              } ${itemsClass} text-xs 2xs:text-base`}
              onClick={() => handleClick(inx, elm.onClick)}
            >
              {elm.title}
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

SwitchButton.defaultProps = {
  containerClassName:
    "bg-tertiary-100 text-tertiary-300 w-full border p-1 border-[#EEEEEE] rounded-xs my-8 cursor-pointer",
  itemsClass: "px-10 py-2 rounded-xs flex-grow text-center",
};
SwitchButton.displayName = "PaymentCardInput";
