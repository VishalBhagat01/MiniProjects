import React, { useState } from "react";
import Card from "./Card";
import { useRef } from "react";

function Foreground() {

  const ref = useRef(null);


  const data = [
    {
      desc: "This is a Dynamic card",
      filesize: ".4mb",
      close: true,
      tag: { isOpen: true , tagtitle : "Download Now"  , tagColor: "green" },
    },
    {
      desc: "This is a Dynamic card",
      filesize: ".4mb",
      close: true,
      tag: { isOpen: true , tagtitle : "Download Now"  , tagColor: "blue" },
    },
    {
      desc: "This is a Dynamic card",
      filesize: ".4mb",
      close: true,
      tag: { isOpen: true , tagtitle : "Download Now"  , tagColor: "green" },
    },
  ];

  return (
    <>
      <div ref={ref} className="w-full h-full fixed z-[3] top-0 left-0 flex gap-10 flex-wrap">
        {data.map((item, index) => (
          <Card key={index} data={item} reference={ref} />
        ))}
      </div>
    </>
  );
}

export default Foreground;
