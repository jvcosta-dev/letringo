import { FunctionComponent, ReactNode } from "react";

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
    <button
      type={submit ? "submit" : "button"}
      aria-label={ariaLabel}
      className={`text-${size} ${
        outlined
          ? "text-primary border-neutral-gray"
          : "bg-primary border-blue-dark text-white"
      } ${
        fill ? "w-full" : "w-max"
      } flex justify-center p-3 font-bold uppercase border-2 border-b-4 rounded-xl active:scale-105 transition-transform duration-75 disabled:bg-neutral-gray disabled:border-neutral-dark`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
