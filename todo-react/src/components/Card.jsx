import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { motion, scale } from "framer-motion";

const Card = ({data , reference}) => {
  return (
    <motion.div drag dragConstraints={reference} whileDrag={{scale: 1.2}} dragElastic={0.1} dragTransition={{bounceStiffness: 300 , bounceDamping : 20}} className="relative w-60 h-72 rounded-[45px] flex-shrink-0 bg-zinc-900/90 text-zinc-100 px-8 py-10 overflow-hidden">
      <FaRegFileAlt size="1.3rem" />

      <p className="mt-4 text-sm font-semibold leading-tight">
        {data.desc}
      </p>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex items-center justify-between px-5 py-3">
          <h5>{data.filesize}</h5>

          <span className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-zinc-700">
            {data.close ? <MdClose /> : <FaDownload size="0.8rem" />}
          </span>
        </div>
        {data.tag.isOpen && (
            <div className={`${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"} py-4`}>
                <h3 className="text-center text-lg font-bold">
                {data.tag.tagtitle}
                </h3>
            </div>
            )}
      </div>
    </motion.div>
  );
};

export default Card;