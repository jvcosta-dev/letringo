import { ElementType, FunctionComponent } from "react";

interface StatProps {
  Icon: ElementType;
  iconColor?: string;
  value: number | string;
  label: string;
}

const Stat: FunctionComponent<StatProps> = ({
  Icon,
  iconColor,
  value,
  label,
}) => {
  return (
    <div className="flex flex-row gap-1 items-start md:gap-2 lg:gap-3 p-2 rounded-xl border-2 border-b-4 border-neutral-gray dark:border-white">
      <Icon
        style={{ width: 32, height: 32 }}
        className={`${iconColor ? `text-${iconColor}` : "text-primary"}`}
        aria-label={label}
      />
      <div className="flex flex-col">
        <h4 className="text-xl font-bold">{value}</h4>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Stat;
