import React, { useContext, useState } from "react";
import "./Body.css";
import { Button, IconButton, Tooltip } from "@mui/material";
import CustomColors from "../../context/colors";
import { FaRegFolderOpen } from "react-icons/fa";
import {
  VisuallyHiddenInput,
  baseUrl,
  buttonStyle,
} from "../../context/constants";
import { BsFiletypeTxt } from "react-icons/bs";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BizBanterContext } from "../../context/context";
import Chat from "../Chat/Chat";

function Text(props) {
  const {
    screenWidth,
    uploadFile,
    selectedModule,
    setCurrentChain,
    setSnackbarState,
  } = useContext(BizBanterContext);
  const [status, setStatus] = useState("train");
  const [localUrl, setLocalUrl] = useState("");
  const [localFile, setLocalFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("Upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  //train, chain

  const handleFileChange = (e) => {
    let files = e.target.files;
    // console.log(files);
    if (!files.length) {
      return;
    }
    let file = files[0];
    setLocalFile(file);
    setLocalUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setLocalFile("");
    setLocalUrl("");
    setUploadStatus("Upload");
    setStatus("train");
  };

  const trainModel = async (onlineUrl) => {
    setUploadStatus("Reading file...");
    try {
      let res = await fetch(`${baseUrl}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_type: selectedModule.key,
          file_url: onlineUrl,
        }),
      });
      res = await res.json();
      console.log(res);
      setCurrentChain(res?.chainId);
      setUploading(false);
      setUploadStatus("Uploaded");
      setStatus("chain");
    } catch (e) {
      console.log(e);
      setUploading(false);
      setUploadStatus("Upload");
      setSnackbarState({
        open: true,
        severity: "error",
        message: "An error occured!",
      });
    }
  };

  const handleUpload = async () => {
    if (uploadStatus !== "Upload" || uploading) return;
    setUploading(true);
    setUploadStatus("uploading_file");
    try {
      await uploadFile(localFile, trainModel, "bizbanter", setUploadProgress);
    } catch (e) {
      console.log(e);
      setUploading(false);
      setUploadStatus("Upload");
      setSnackbarState({
        open: true,
        severity: "error",
        message: "An error occured!",
      });
    }
  };

  return (
    <div className="body_container">
      <p className="body_header_text">
        Upload a Text document and Bizbanter will help you answer questions from
        it.
      </p>
      <div className="file_stage">
        {localFile ? (
          <>
            <div className="file_stage_header">
              <Tooltip title="Remove">
                <IconButton onClick={handleRemoveFile}>
                  <CloseRoundedIcon sx={{ color: CustomColors.pearlWhite }} />
                </IconButton>
              </Tooltip>
            </div>

            <BsFiletypeTxt size={100} color={CustomColors.pureWhite} />
            <div className="stage_footer">
              <p className="file_name">
                {screenWidth > 550
                  ? localFile.name
                  : localFile.name.slice(0, 12) + "..."}
              </p>

              <Link to={localUrl} target="_blank" rel="noopener noreferrer">
                <Tooltip title="Open" placement="right">
                  <IconButton>
                    <OpenInNewRoundedIcon
                      sx={{ color: CustomColors.pureWhite }}
                    />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
            <Button
              onClick={handleUpload}
              startIcon={<IoCloudUploadOutline />}
              variant="filled"
              style={{
                ...buttonStyle,
                backgroundColor: CustomColors.grey700,
                color: CustomColors.pureWhite,
                // border: `1px solid ${CustomColors.pureWhite}`,
                width: "150px",
                borderRadius: "75px",
                marginBottom: "10px",
              }}
            >
              {uploadStatus === "uploading_file"
                ? uploadProgress.toString() + "%"
                : uploadStatus}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            component="label"
            startIcon={<FaRegFolderOpen />}
            style={buttonStyle}
          >
            Choose Text
            <VisuallyHiddenInput
              type="file"
              accept=".txt"
              onChange={handleFileChange}
            />
          </Button>
        )}
      </div>

      {status === "chain" ? <Chat file={localFile} /> : <></>}
    </div>
  );
}

export default Text;
