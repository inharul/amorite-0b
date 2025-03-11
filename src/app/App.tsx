import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MyEditor from "../components/Editor";
import { Titlebar } from "../components/Titlebar";

function App() {
  const [video, setVideo] = useState("");
  const [show, setshow] = useState<boolean>(true);
  const [tree, setTree] = useState<boolean>(true);
  const [padding, setpadding] = useState<string>("2");
  const [isDragging, setDragging] = useState(false);
  const [isTitlebarVisible, setTitlebarVisible] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
    setTitlebarVisible(true);
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    setDragging(false);
    if (e.clientY >= 30) {
      setTitlebarVisible(false);
    }
  };

  // Handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.key === "s") {
        setshow((prev) => !prev);
        event.preventDefault();
      } else if (event.key === "l") {
        setTree((prev) => !prev);
        event.preventDefault();
      } else if (event.key === "t") {
        setTree(true);
        setshow(true);
        event.preventDefault();
      } else if (event.key === "k") {
        setTree(false);
        setshow(false);
        setpadding((prev) => (prev == "2" ? "4" : "2"));
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="h-screen flex flex-col"
      onPointerMove={(e) => {
        if (isDragging) {
          setTitlebarVisible(true);
          return;
        }

        if (e.clientY < 30) {
          setTitlebarVisible(true);
          return;
        }
      }}
      onPointerUp={handleDragEnd}
      onPointerLeave={(e) => {
        if (!isDragging && e.clientY >= 30) {
          setTitlebarVisible(false);
        }
      }}
    >
      <div className="relative z-10">
        <Titlebar
          isVisible={isTitlebarVisible}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        <main className="flex h-svh overflow-hidden">
          <motion.div
            className="treebar"
            style={{ backgroundColor: "#4f4f4f73" }}
            animate={{ width: tree ? "20%" : "0px" }}
          >
            <motion.div
              animate={{ opacity: tree ? 1 : 0 }}
              className="overflow-x-hidden"
              style={{ padding: "1rem" }}
            >
              <p className="font-normal font-mono text-2xl flex">
                Amorite{" "}
                <pre className="ml-2 font-semibold text-gray-600">0B</pre>
              </p>
              {/* <input
                type="text"
                placeholder="Paste video ID here"
                value={video}
                className="bg-transparent  mt-3 ml-1 border-slate-300 border-solid border-x border-y outline-none"
                onChange={(e) => setVideo(e.target.value)}
              /> */}
            </motion.div>
          </motion.div>

          <div className="middle h-full" style={{ padding: `${padding}em` }}>
            <MyEditor />
          </div>
          <motion.div
            className="sidebar overflow-hidden"
            animate={{ width: show ? "20%" : "0px" }}
          >
            <p className="py-5 px-4 text-xs font-mono border-gray-600 flex justify-center">
              Every empty place <br /> eventually turns out to <br /> become
              something beautiful <br />
              right?
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
