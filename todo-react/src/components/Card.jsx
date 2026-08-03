import { useRef } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const Card = ({
  data,
  reference,
  deleteCard,
  toggleCardComplete,
}) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      className="relative w-60 h-72 rounded-[45px] flex-shrink-0 bg-zinc-900/90 text-zinc-100 px-8 py-10 overflow-hidden"
    >
      <FaRegFileAlt size="1.3rem" />

      <p className="mt-4 text-sm font-semibold leading-tight">
        {data.desc}
      </p>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex items-center justify-between px-5 py-3">
          <h5>{data.title}</h5>

          <span
              onClick={() => deleteCard(data.id)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-zinc-700"
          >
              <MdClose />
          </span>
        </div>
        <button
          type="button"
          onClick={() => toggleCardComplete(data.id)}
          className={`${data.completed ? "bg-green-600" : "bg-red-600"} w-full py-4 transition-colors`}
          aria-pressed={data.completed}
        >
          <h3 className="text-center text-lg font-bold">
            {data.completed ? "Completed" : "Incomplete"}
          </h3>
        </button>
      </div>
    </motion.div>
  );
};

export default Card;