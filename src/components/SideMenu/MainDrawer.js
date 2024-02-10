import React, { useContext, useState } from "react";
import { IconButton, SwipeableDrawer, Tooltip } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CustomColors from "../../context/colors";
import { BizBanterContext } from "../../context/context";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Logo from "../Logo/Logo";
import SideMenu from "./SideMenu";

function MainDrawer(props) {
  const { screenWidth } = useContext(BizBanterContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const drawerWidth = screenWidth > 300 ? 300 : screenWidth;
  return (
    <>
      <IconButton onClick={handleOpen} sx={{ marginRight: "10px" }}>
        <MenuRoundedIcon sx={{ color: CustomColors.pureWhite }} />
      </IconButton>
      <SwipeableDrawer
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        anchor="left"
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: CustomColors.dark,
            borderRight: `1px solid ${CustomColors.pureWhite}`,
          },
        }}
      >
        <div className="drawer_header">
          <Logo />
          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon sx={{ color: CustomColors.pureWhite }} />
            </IconButton>
          </Tooltip>
        </div>
        <SideMenu onClose={handleClose} />
      </SwipeableDrawer>
    </>
  );
}

export default MainDrawer;
