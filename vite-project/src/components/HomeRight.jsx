import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function HomeRight() {
  return (
    <>
      <Card variant="outlined" sx={{ bgcolor: "primary.main",boxShadow: "0px 2px 8px 2px rgba(255, 255, 255, 0.5)", }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "bold",
            p: 2,
            color: "text.primary",
          }}
        >
          Top Artists this week
        </Typography>

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "primary.main",
            p: 2,
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ed sheeran"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline", color: "text.primary" }}
                    component="span"
                    variant="body2"
                  >
                    vocalist
                  </Typography>
                </>
              }
              sx={{ color: "text.primary" }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Card>
    </>
  );
}

export default HomeRight;
