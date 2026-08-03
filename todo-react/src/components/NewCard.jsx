import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NewCard({ addCard }) {
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!desc.trim()) return;

    addCard({
      desc,
      title,
      close: true,
      tag: {
        isOpen: true,
        tagtitle: "Completed",
        tagColor: "green",
      },
    });

    setDesc("");
    setTitle("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="composer"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="w-[22rem] rounded-[2rem] bg-zinc-900 p-5"
          >
            <h2 className="text-xl font-semibold mb-4">
              Create Card
            </h2>

            <input
              className="w-full mb-3 rounded bg-zinc-800 p-3 outline-none"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <input
              className="w-full mb-3 rounded bg-zinc-800 p-3 outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 rounded bg-green-600 py-2"
              >
                Add
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded bg-zinc-700 py-2"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-green-600 px-5 py-3"
          >
            Add Card
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewCard;