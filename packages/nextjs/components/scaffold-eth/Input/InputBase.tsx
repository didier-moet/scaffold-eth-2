import { ChangeEvent, ReactNode, useCallback } from "react";
import { CommonInputProps } from "~~/components/scaffold-eth";

type InputBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const InputBase = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
}: InputBaseProps<T>) => {
  let modifier = "";
  if (error) {
    modifier = "border-error";
  } else if (disabled) {
    modifier = "border-disabled bg-base-300";
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange],
  );

  return (
    <div className={`flex border-2 border-base-300 bg-base-200 rounded text-base-800 ${modifier}`}>
      {prefix}
      <input
        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-base-800 h-[3.3rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-base-400 text-sm font-mono"
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
      />
      {suffix}
    </div>
  );
};
