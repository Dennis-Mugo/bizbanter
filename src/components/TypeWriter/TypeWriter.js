import React, { useEffect, useState } from "react";
import ChatResultSources from "../ChatResultSources/ChatResultSources";

function TypeWriter({
  text,
  style,
  scrollToBottom,
  StartIcon,
  className,
  sourceDocuments,
}) {
  const [rendered, setRendered] = useState("");
  const typeWriting = false;
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    let chunks = text.split("\n");
    chunks = chunks.map((chunk, i) => (
      <p key={chunk} className={className}>
        {i === 0 ? StartIcon : <></>} {chunk}
        <br />
      </p>
    ));
    setParagraphs(chunks);
  }, [text]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      if (count - 5 <= text.length) {
        setRendered(text.slice(0, count) + "●");
        if (scrollToBottom) {
          scrollToBottom();
        }
      }
    }, 80); //previously 40ms

    return () => clearInterval(interval);
  }, [text]);

  if (!typeWriting) {
    return (
      <>
        {paragraphs}
        <ChatResultSources sourceDocs={sourceDocuments} />{" "}
      </>
    );
  }
  return (
    <p className={className} style={{ ...style }}>
      {StartIcon} {rendered}
    </p>
  );
}

export default TypeWriter;
