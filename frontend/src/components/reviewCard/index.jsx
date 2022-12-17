import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ReactStars from "react-rating-stars-component";
import "./reviewCard.scss";
const ReviewCard = ({ review }) => {
  let options = {
    count: 5,
    value: review?.rating,
    size: 25,
    isHalf: true,
    activeColor: "#ffd700",
    edit: false,
  };
  return (
    <>
      <Paper className="review-card" elevation={1}>
        <div className="review-img">
          <img
            src={
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.vybSJz_1zcw-6HLlUtfKEgHaHa%26pid%3DApi&f=1"
            }
            alt=""
          />
        </div>
        <div className="review-rating">
          <ReactStars {...options} />
        </div>
        <div className="review-comment">
          <Typography>{review?.comment}</Typography>
        </div>
      </Paper>
    </>
  );
};

export default ReviewCard;
