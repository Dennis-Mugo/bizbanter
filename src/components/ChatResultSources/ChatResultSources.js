import React, { useContext, useEffect, useState } from "react";
import { BizBanterContext } from "../../context/context";
import { Link } from "react-router-dom";
import CustomColors from "../../context/colors";

function ChatResultSources({ sourceDocs }) {
  const { selectedModule } = useContext(BizBanterContext);
  const [sources, setSources] = useState([]);
  console.log(sourceDocs);
  useEffect(() => {
    if (selectedModule.key === "web") {
      setSources(
        Array.from(new Set(sourceDocs.map((doc) => doc.metadata.source)))
      );
    } else {
      setSources(sourceDocs);
    }
  }, [sourceDocs, selectedModule]);

  if (selectedModule.key === "web" || selectedModule.key === "yt") {
    return (
      <>
        <br />
        <h3>Sources: </h3>
        {sources.map((source, i) =>
          selectedModule.key === "web" ? (
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
          ) : (
            <Link
              key={i}
              to={`https://www.youtube.com/watch?v=${source?.source}`}
              style={{ color: CustomColors.pearlWhite }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source?.title}
              <br />
            </Link>
          )
        )}
      </>
    );
  } else {
    return <></>;
  }
}

export default ChatResultSources;
