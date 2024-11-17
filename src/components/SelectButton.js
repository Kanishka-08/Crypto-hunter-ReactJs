import { useTheme } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  const theme = useTheme();

  return (
    <span
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "inherit",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        // margin: 5, // Uncomment if needed
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
