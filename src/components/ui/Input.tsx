import { ChangeEvent, ElementType, FunctionComponent } from "react";

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "number";
  value: string;
  Icon: ElementType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
  label,
  name,
  placeholder,
  type,
  value,
  Icon,
  onChange,
  required,
}) => {
  return (
    <label
      htmlFor={name}
      className="w-full flex flex-col gap-0 text-xl font-bold text-neutral-dark"
    >
      {label}
      <div className="w-full flex items-center p-3 gap-1 rounded-xl border-2 border-b-4 border-neutral-gray group">
        <Icon className="text-neutral-gray" />
        <input
          autoComplete="off"
          id={name}
          name={name}
          placeholder={placeholder ? placeholder : "Digite aqui"}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full placeholder:text-neutral-gray outline-none group bg-transparent"
        />
      </div>
    </label>
  );
};

export default Input;
