import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { User } from "shared/types";

type UserCardProps = {
  userInfo: User;
  onCardClick: (id: number) => void;
};

const UserCard = ({ userInfo, onCardClick }: UserCardProps) => {
  const navigate = useNavigate();
  const { id, name, username, email, address, phone, website, company } =
    userInfo;
  return (
    <Card
      sx={{
        width: "300px",
        maxWidth: "350px",
        backgroundColor: "#eee",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        height: "340px",
        overflow: "visible",
        marginTop: "60px",
      }}
    >
      <CardMedia
        component="img"
        alt={`${name} name`}
        sx={{
          objectFit: "contain",
          height: "150px",
          width: "150px",
          position: "absolute",
          top: "-50px",
          zIndex: "10",
          transform: "translate(50%,0)",
          border: "1px solid #ccc",
          boxShadow: "2px 2px 2px #ccc",
          boxSizing: "border-box",
          hover: { boxShadow: "2px 2px 4px #ccc" },
          cursor:'pointer'
        }}
        image={window.location.origin + "/images/user-logo.png"}
        onClick={() => onCardClick(id)}
      />
      <CardContent sx={{ height: "170px", overflowY: "auto" }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
          {`${address.city}, ${address.street}, ${address.zipcode}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Email:</span> {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Phone:</span> {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Website:</span> {website}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/users/${id}`)}>
          Show profile
        </Button>
        <Button size="small" onClick={() => onCardClick(id)}>
          Show posts
        </Button>
      </CardActions>
    </Card>
  );
};

export { UserCard };
