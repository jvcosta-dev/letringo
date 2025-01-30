import { FunctionComponent } from "react";

interface LoadingProps {
  singleElement?: boolean;
  elementCount?: number;
}

const Loading: FunctionComponent<LoadingProps> = ({
  singleElement,
  elementCount,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-xl">
      <div
        className={`${
          singleElement ? "w-full h-16" : "w-40 h-12"
        }  bg-neutral-gray rounded-xl animate-pulse`}
      />
      {!singleElement &&
        (elementCount ? (
          Array.from({ length: elementCount }).map((_, i) => (
            <div
              key={i}
              className="h-40 w-full bg-neutral-gray rounded-xl animate-pulse"
            />
          ))
        ) : (
          <div className="h-44 w-full bg-neutral-gray rounded-xl animate-pulse" />
        ))}
    </div>
  );
};

export default Loading;
