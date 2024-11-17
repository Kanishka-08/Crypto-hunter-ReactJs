import { LinearProgress, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const theme = useTheme();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: ["column", "row"],
      }}
    >
      <div
        sx={{
          width: ["100%", "30%"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          sx={{ marginBottom: 2 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: "justify", padding: 2 }}>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div
          sx={{
            alignSelf: "start",
            padding: 2,
            width: "100%",
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span sx={{ display: "flex", marginBottom: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Rank:
            </Typography>
            <Typography variant="h5" sx={{ ml: 1, fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span sx={{ display: "flex", marginBottom: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Current Price:
            </Typography>
            <Typography variant="h5" sx={{ ml: 1, fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span sx={{ display: "flex", marginBottom: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Market Cap:
            </Typography>
            <Typography variant="h5" sx={{ ml: 1, fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
