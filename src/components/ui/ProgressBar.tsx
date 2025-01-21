import { FunctionComponent } from "react";

interface ProgressBarProps {
  value: number;
  maxValue: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  value,
  maxValue,
}) => {
  return (
    <div className="flex flex-col items-center gap-0">
      <label className="text-xl font-bold">
        {value}/{maxValue}
      </label>
      <span className="w-full border-2 h-4 text-center border-neutral-gray rounded-full">
        <div
          className="bg-yellow h-full"
          style={{ width: `${(value / maxValue) * 100}%` }}
        ></div>
      </span>
    </div>
  );
};

export default ProgressBar;
