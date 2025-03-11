import { motion } from "framer-motion";

interface TitlebarProps {
  isVisible: boolean;
  onDragStart: () => void;
  onDragEnd: (e: React.PointerEvent<HTMLDivElement>) => void;
}
interface Window {
  windowControls: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };
}

export const Titlebar = ({
  isVisible,
  onDragStart,
  onDragEnd,
}: TitlebarProps) => {
  return (
    <motion.div
      data-tauri-drag-region
      className="absolute top-0 left-0 right-0 z-20 bg-[#0f0f0f] border-b border-[#3d3d3d] cursor-default active:cursor-grabbing"
      initial={false}
      animate={{
        y: isVisible ? 0 : -28,
        height: isVisible ? 28 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      data-show-titlebar
      onPointerDown={onDragStart}
      onPointerUp={onDragEnd}
    >
      <div
        className="flex justify-between items-center h-full px-1.5"
        // data-tauri-drag-region
      >
        <div className="flex-1 flex items-center" data-tauri-drag-region>
          <span className="text-xs font-medium text-neutral-400 select-none ml-1.5">
            Amorite
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => console.log("close")}
            className="hover:bg-[#3d3d3d] p-1.5 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button
            onClick={() => console.log("max")}
            className="hover:bg-[#3d3d3d] p-1.5 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button
            onClick={() => console.log("min")}
            className="hover:bg-red-500 p-1.5 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
