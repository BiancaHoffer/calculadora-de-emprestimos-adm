import { dateFormat } from "@/utils/dateFormart";
import { ComponentProps } from "react";

interface CalenderProps extends ComponentProps<'input'> {
  value: any;
}

export function Calender({ value }: CalenderProps) {
  return (
    <div className="relative w-[100%]">
      <input type="date" id="input-date" value={value} />
      <button className="p-3 bg-zinc-50 rounded-lg shadow-md text-sm focus-within:shadow-lg cursor-pointer w-full">
        <p className="text-start">
          {dateFormat(value)}
        </p>
      </button>
    </div>

  )
}