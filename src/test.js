import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [bingoCode, setBingoCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newCode = e.target.value;
    setBingoCode(newCode);
  };

  const handleGetCard = () => {
    navigate(`/${bingoCode}`);
  };

  return (
    <div className="app">
      <h1>Enter your game code here</h1>
      <TextField
        id="outlined-basic"
        label="Game Code"
        variant="outlined"
        sx={{
          width: "100%",
        }}
        onChange={handleChange}
        value={bingoCode}
        autoComplete="none"
      />
      <Button
        sx={{
          margin: "10px",
          width: "100%",
          textDecoration: "none",
        }}
        variant="contained"
        onClick={handleGetCard}
      >
        Get Card
      </Button>
    </div>
  );
};

export default App;
