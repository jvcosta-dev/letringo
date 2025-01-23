import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";
import { springHover } from "../../utils/animations";
import { useSettings } from "../../contexts/SettingsContext";

interface ButtonProps {
  children: ReactNode;
  submit?: boolean;
  ariaLabel: string;
  size: "normal" | "xl";
  outlined?: boolean;
  fill?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
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
  bgColor,
}) => {
  const { animations, sound } = useSettings();

  const playSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();
  };

  const handleClick = () => {
    if (sound) playSound();

    if (!disabled) {
      if (onClick) onClick();
    }
  };

  return (
    <motion.button
      whileHover={animations ? springHover.whileHover : undefined}
      whileTap={animations ? springHover.whileTap : undefined}
      transition={animations ? springHover.transition : undefined}
      type={submit ? "submit" : "button"}
      aria-label={ariaLabel}
      className={`text-${size} ${
        bgColor && `bg-${bgColor} border-neutral-dark dark:border-white`
      } ${
        !bgColor && outlined
          ? "text-primary dark:text-white border-neutral-gray"
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
