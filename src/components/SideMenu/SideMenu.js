import React, { useContext, useState } from "react";
import "./SideMenu.css";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import CustomColors from "../../context/colors";
import { modules } from "../../context/constants";
import { BizBanterContext } from "../../context/context";

function SideMenu({ onClose }) {
  const { selectedModule } = useContext(BizBanterContext);
  return (
    <div className="side_menu_container">
      {modules.map((item, i) => (
        <MenuItem
          key={item.key}
          module={item}
          Icon={item.icon}
          title={item.title}
          selected={item.key == selectedModule.key}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

const MenuItem = ({ module, title, selected, Icon, onClose }) => {
  const { setSelectedModule } = useContext(BizBanterContext);
  const [hovered, setHovered] = useState(false);
  const handleClick = () => {
    setSelectedModule(module);
    if (onClose) {
        onClose();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="sidemenu_item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered
          ? CustomColors.grey800
          : selected
          ? CustomColors.grey700
          : CustomColors.dark,
      }}
    >
      <Icon
        size="1.5em"
        style={{ margin: "0 20px", color: CustomColors.pureWhite }}
      />
      <p className="sidemenu_item_title">{title}</p>
    </div>
  );
};

export default SideMenu;
