import React, { useContext, useEffect, useState } from "react";
import "./Body.css";
import {
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TbWorld } from "react-icons/tb";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IoCheckmark } from "react-icons/io5";

import CustomColors from "../../context/colors";
import uuid4 from "uuid4";
import { baseUrl, buttonStyle } from "../../context/constants";
import { BizBanterContext } from "../../context/context";
import Chat from "../Chat/Chat";
import { LoadingButton } from "@mui/lab";

function WebUrl(props) {
  const { setCurrentChain } = useContext(BizBanterContext);
  const [urlCount, setUrlCount] = useState(1);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [urls, setUrls] = useState([""]);
  const [urlErrors, setUrlErrors] = useState([""]);
  const [status, setStatus] = useState("train");
  //train, chain

  const handleUrlChange = (event, index) => {
    let value = event?.target?.value || event;
    let lst = [...urls];
    lst[index] = value;
    setUrls(lst);
  };

  const handleCloseUrl = (index) => {
    let lst = [...urls];
    lst = lst.filter((_, i) => i !== index);
    setUrlCount((prev) => prev - 1);
    setUrls(lst);
  };

  const handleAddUrl = () => {
    setUrlCount((prev) => prev + 1);
    let lst = [...urls];
    lst.push("");
    setUrls(lst);
  };

  const handleValidation = () => {
    let passValidated = true;
    let lst = Array(urlCount).fill("");
    for (let i = 0; i < urlCount; i++) {
      try {
        let givenUrl = new URL(urls[i]);
      } catch (e) {
        passValidated = false;
        lst[i] = "Invalid URL!";
      }
    }
    setUrlErrors(lst);
    return passValidated;
  };

  const handleUpload = async () => {
    let valid = handleValidation();
    if (!valid) return;
    setUploadLoading(true);
    let res = await fetch(`${baseUrl}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_type: "web",
        file_url: urls,
      }),
    });
    res = await res.json();
    console.log(res);
    setCurrentChain(res?.chainId);
    setUploadLoading(false);
    setStatus("chain");
  };

  return (
    <div className="body_container link_container">
      <p className="body_header_text">
        Upload website URLs and Bizbanter will help you answer questions from
        them.
      </p>
      <div className="url_input_container">
        <div
          className={
            uploadLoading
              ? `chat_input_container_loading`
              : `chat_input_container`
          }
          style={{ margin: "30px auto 0", width: "100%" }}
        >
          <TbWorld
            color={CustomColors.pureWhite}
            size={23}
            style={{ marginRight: "10px" }}
          />
          <input
            value={urls[0]}
            onChange={(e) => {
              handleUrlChange(e, 0);
            }}
            type="text"
            placeholder={`Enter URL...`}
          />
          {/* <div>
          <Tooltip title="Submit">
            <IconButton onClick={handleSend}>
              <CloseIcon sx={{ color: CustomColors.pureWhite }} />
            </IconButton>
          </Tooltip>
        </div> */}
        </div>
        {uploadLoading ? (
          <div
            style={{
              color: CustomColors.pureWhite,
              width: "100%",
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
        <p className="helper_text">{urlErrors[0]}</p>
      </div>

      {urlCount > 1 ? (
        urls.slice(1, urlCount).map((_, index) => (
          <div className="url_input_container" key={index}>
            <div
              className={
                uploadLoading
                  ? `chat_input_container_loading`
                  : `chat_input_container`
              }
              style={{ margin: "30px auto 0", width: "100%" }}
            >
              <TbWorld
                color={CustomColors.pureWhite}
                size={23}
                style={{ marginRight: "10px" }}
              />
              <input
                value={urls[index + 1]}
                onChange={(e) => {
                  let value = e.target.value;
                  handleUrlChange(value, index + 1);
                }}
                type="text"
                placeholder={`Enter URL...`}
              />
              <div>
                <Tooltip title="Remove" placement="left">
                  <IconButton
                    onClick={() => {
                      handleCloseUrl(index + 1);
                    }}
                  >
                    <DeleteOutlineIcon
                      sx={{ color: CustomColors.pearlWhite }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            {uploadLoading ? (
              <div
                style={{
                  color: CustomColors.pureWhite,
                  width: "100%",
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
            <p className="helper_text">{urlErrors[index + 1]}</p>
          </div>
        ))
      ) : (
        <></>
      )}
      <div className="url_action_container">
        <Button
          onClick={handleAddUrl}
          startIcon={<AddIcon />}
          variant="filled"
          style={{
            ...buttonStyle,
            marginRight: "20px",
            //   backgroundColor: CustomColors.pureWhite,
            //   color: CustomColors.dark,
            //   width: "150px",
            //   borderRadius: "75px",
          }}
        >
          Add URL
        </Button>
        <Button
          onClick={handleUpload}
          startIcon={
            uploadLoading ? (
              <CircularProgress
                sx={{ color: CustomColors.grey500 }}
                size="20px"
              />
            ) : (
              <IoCheckmark />
            )
          }
          variant="filled"
          style={{
            ...buttonStyle,
            //   backgroundColor: CustomColors.pureWhite,
            //   color: CustomColors.dark,
            //   width: "150px",
            //   borderRadius: "75px",
          }}
        >
          {uploadLoading ? "Analysing" : "Upload"}
        </Button>
      </div>
      {status === "chain" ? <Chat /> : <></>}
    </div>
  );
}

export default WebUrl;
