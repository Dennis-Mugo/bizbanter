import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { BizBanterContext } from "../../context/context";

function SnackBar(props) {
  const { snackbarState, setSnackbarState } = useContext(BizBanterContext);

  const handleClose = () => {
    setSnackbarState({ open: false, message: "", severity: "" });
  };

  return (
    <Snackbar
      autoHideDuration={10000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackbarState.open}
      onClose={handleClose}
    >
      <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
    </Snackbar>
  );
}

export default SnackBar;
