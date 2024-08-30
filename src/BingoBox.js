import React, { useState } from "react";
import { Box } from "@mui/material";

const BingoBox = ({ text }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleNumberClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <Box
        sx={{
          width: "60px",
          height: "60px",
          display: "flex",
          color: "black",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isClicked && "gray",
          border: "solid 1px black",
          cursor: "pointer",
        }}
        onClick={handleNumberClick}
      >
        {text}
      </Box>
    </>
  );
};

export default BingoBox;
