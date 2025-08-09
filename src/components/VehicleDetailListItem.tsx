import React from "react";
import { X } from "lucide-react";

export function ListItemWithTooltip({
  message,
  children,
  section,
}: {
  message: string;
  children: React.ReactNode;
  section?: string;
}) {
  const isPurple = section === "ev" ? "bg-purple-100" : "bg-orange-100";
  return (
    <li>
      <div
        className={`flex flex-row justify-between border p-2 rounded-md items-center ${isPurple} font-bold`}
      >
        <div className="relative group ">
          {children}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex z-20">
            <span className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg transition-all opacity-90">
              {message}
            </span>
          </div>
        </div>
        <div className="px-2 hover:cursor-pointer">
          <X className="w-4 h-4 hover:text-red-500" />
        </div>
      </div>
    </li>
  );
}

export default ListItemWithTooltip;
