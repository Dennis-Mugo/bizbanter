import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaFileWord } from "react-icons/fa6";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import { FaRegNoteSticky } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa6";
import { styled } from "@mui/material/styles";
import CustomColors from "./colors";

export const baseUrl = "http://127.0.0.1:5000";

export const modules = [
  {
    title: "Upload PDF",
    icon: BsFileEarmarkPdfFill,
    key: "pdf",
  },
  {
    title: "Word document",
    icon: FaFileWord,
    key: "docx",
  },
  {
    title: "Powerpoint presentation",
    icon: SiMicrosoftpowerpoint,
    key: "pptx",
  },
  {
    title: "Text document",
    icon: FaRegNoteSticky,
    key: "txt",
  },
  {
    title: "Website link",
    icon: TbWorld,
    key: "web",
  },
  {
    title: "Youtube video",
    icon: FaYoutube,
    key: "yt",
  },
];

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const buttonStyle = {
  backgroundColor: CustomColors.pureWhite,
  textTransform: "none",
  color: CustomColors.dark,
  fontFamily: "Nunito",
};
