import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";
import { springHover } from "../../utils/animations";

interface ButtonProps {
  children: ReactNode;
  submit?: boolean;
  ariaLabel: string;
  size: "normal" | "xl";
  outlined?: boolean;
  fill?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  submit,
  ariaLabel,
  size,
  outlined,
  fill,
  onClick,
  disabled,
}) => {
  const playSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();
  };

  const handleClick = () => {
    if (!disabled) {
      playSound();
      if (onClick) onClick();
    }
  };

  return (
    <motion.button
      whileHover={springHover.whileHover}
      whileTap={springHover.whileTap}
      transition={springHover.transition}
      type={submit ? "submit" : "button"}
      aria-label={ariaLabel}
      className={`text-${size} ${
        outlined
          ? "text-primary border-neutral-gray"
          : "bg-primary border-blue-dark text-white"
      } ${
        fill ? "w-full" : "w-max"
      } flex justify-center p-3 font-bold uppercase border-2 border-b-4 rounded-xl disabled:bg-neutral-gray disabled:border-neutral-dark`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
