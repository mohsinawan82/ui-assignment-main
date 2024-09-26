import { IconButton } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { NavigateFunction } from "react-router-dom";

interface BackButtonProps {
  navigate: NavigateFunction;
}


const BackButton = ({ navigate }: BackButtonProps) => (
  <IconButton
    sx={{
      backgroundColor: "white",
      padding: 1,
      borderRadius: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={() => navigate(-1)}
  >
    <KeyboardArrowLeft sx={{ width: 30, height: 30 }} />
  </IconButton>
);

export default BackButton;
