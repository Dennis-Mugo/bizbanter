import React, { useContext, useState } from "react";
import "./Chat.css";
import { IconButton, LinearProgress, Tooltip } from "@mui/material";
import { BizBanterContext } from "../../context/context";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import CustomColors from "../../context/colors";
import { baseUrl } from "../../context/constants";
import { BsStars } from "react-icons/bs";
import TypeWriter from "../TypeWriter/TypeWriter";
import SnackBar from "../SnackBar/SnackBar";

function Chat({ file }) {
  const { selectedModule, currentChain, setSnackbarState } =
    useContext(BizBanterContext);
  const [sendLoading, setSendLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();

  const handleChatChange = (e) => {
    let value = e.target.value;
    setPrompt(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSend();
  };

  const handleSend = async () => {
    if (!prompt.length || sendLoading) return;
    setSendLoading(true);
    try {
      let res = await fetch(`${baseUrl}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: prompt,
          chainId: currentChain,
        }),
      });
      res = await res.json();
      console.log(res);

      setResult(res);
      setSendLoading(false);
    } catch (e) {
      console.log(e);
      setSnackbarState({
        message: "An error occured!",
        open: true,
        severity: "error",
      });
      setSendLoading(false);
    }
  };
  return (
    // <div className="chat_container">
    <>
      {/* <h4>Enter your prompt</h4> */}
      <form
        className={
          sendLoading ? `chat_input_container_loading` : `chat_input_container`
        }
        onSubmit={handleFormSubmit}
      >
        <BsStars
          color={CustomColors.pureWhite}
          size={23}
          style={{ marginRight: "10px" }}
        />
        <input
          value={prompt}
          onChange={handleChatChange}
          type="text"
          placeholder={`Type your question here`}
        />
        <div>
          <Tooltip title="Submit">
            <IconButton onClick={handleSend}>
              <SendSharpIcon sx={{ color: CustomColors.pureWhite }} />
            </IconButton>
          </Tooltip>
        </div>
      </form>
      {sendLoading ? (
        <div
          style={{
            color: CustomColors.pureWhite,
            width: "85%",
            // borderRadius: "0 0 10px 10px",
            // overflow: "hidden",
            height: "5px",
            border: `2px solid ${CustomColors.pureWhite}`,
            borderTop: "none",
          }}
        >
          <LinearProgress color="inherit" sx={{ height: "5px" }} />
        </div>
      ) : (
        <></>
      )}
      {result ? (
        <div className="chat_result_container">
          <TypeWriter
            className="chat_result_text"
            StartIcon={<BsStars color={CustomColors.pureWhite} size={20} />}
            text={result?.answer}
            sourceDocuments={
              selectedModule.key === "yt"
                ? result?.metadata
                : result?.sourceDocuments
            }
          />
        </div>
      ) : (
        <></>
      )}
    </>
    // </div>
  );
}

export default Chat;
