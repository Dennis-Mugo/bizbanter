import React, { useContext, useEffect, useState } from "react";
import { BizBanterContext } from "../../context/context";
import { Link } from "react-router-dom";
import CustomColors from "../../context/colors";

function ChatResultSources({ sourceDocs }) {
  const { selectedModule } = useContext(BizBanterContext);
  const [sources, setSources] = useState([]);
  console.log(selectedModule);
  useEffect(() => {
    setSources(
      Array.from(new Set(sourceDocs.map((doc) => doc.metadata.source)))
    );
  }, [sourceDocs]);

  if (selectedModule.key !== "web") {
    return <></>;
  }
  return (
    <>
      <br />
      <h3>Sources: </h3>
      {sources.map((source, i) => (
        <Link
          key={i}
          to={source}
          style={{ color: CustomColors.pearlWhite }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.slice(0, 60) + "..."}
          <br />
        </Link>
      ))}
    </>
  );
}

export default ChatResultSources;
