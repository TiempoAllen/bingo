import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BingoBox from "./BingoBox";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const BingoPage = () => {
  const { bingocode } = useParams();
  const [token, setToken] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const [bingoCard, setBingoCard] = useState({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const reload = () => {
    window.location.reload();
  };

  const checkCard = async () => {
    try {
      const response = await axios.get("http://www.hyeumine.com/checkwin.php", {
        params: {
          playcard_token: token,
        },
      });
      const data = response.data;
      setIsCheck(data);

      if (data) {
        const emojis = ["🎉"]; // Add more emojis as needed
        const container = document.body;
        const emojiCount = 10;

        for (let i = 0; i < emojiCount; i++) {
          const emoji = document.createElement("span");
          emoji.className = "falling-emoji";
          emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          emoji.style.left = `${Math.random() * 100}vw`; // Random horizontal position
          emoji.style.animationDelay = Math.random() * 2 + "s";
          container.appendChild(emoji);

          setTimeout(() => {
            document.body.removeChild(emoji);
          }, 5000);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setOpen(true);
  };

  useEffect(() => {
    const getBingoCard = async () => {
      try {
        const response = await axios.get(
          "http://www.hyeumine.com/getcard.php",
          {
            params: {
              bcode: bingocode,
            },
          }
        );
        const data = response.data;
        setBingoCard(data.card);
        setToken(data.playcard_token);
      } catch (error) {
        console.error(error);
      }
    };
    getBingoCard();
  }, [bingocode]);

  return (
    <div className="bingocard">
      <h1>Game Code: {bingocode}</h1>

      <div className="other-options">
        <Link to="/">
          <p>Change Code</p>
        </Link>
        <Link
          to={`http://www.hyeumine.com/bingodashboard.php?bcode=${bingocode}&dr=1`}
        >
          <p>Open Dashboard</p>
        </Link>
      </div>

      <div className="bingo-card">
        <div className="bingo-item">
          B
          {bingoCard.B.map((value, index) => (
            <BingoBox key={index} text={value} />
          ))}
        </div>
        <div className="bingo-item">
          I
          {bingoCard.I.map((value, index) => (
            <BingoBox key={index} text={value} />
          ))}
        </div>
        <div className="bingo-item">
          N
          {bingoCard.N.map((value, index) => (
            <BingoBox key={index} text={value} />
          ))}
        </div>
        <div className="bingo-item">
          G
          {bingoCard.G.map((value, index) => (
            <BingoBox key={index} text={value} />
          ))}
        </div>
        <div className="bingo-item">
          O
          {bingoCard.O.map((value, index) => (
            <BingoBox key={index} text={value} />
          ))}
        </div>
      </div>

      <div className="card-btn">
        <Button onClick={checkCard} variant="contained">
          Check Card
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {isCheck ? "Congratulations! It is a Bingo." : "Not yet Bingo."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
        <Button onClick={reload} variant="contained">
          New Card
        </Button>
      </div>
    </div>
  );
};

export default BingoPage;
