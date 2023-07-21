import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

function HomeRight() {
  return (
    <>
      <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block" ,backgroundColor:"#292725" } }}>
        <Box position="fixed" width={220}>
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
              width: "150%",
              maxWidth: 360,
              bgcolor: "primary.main",
              p: 2,
              borderRadius: "15px",
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
        </Box>
      </Box>
    </>
  );
}

export default HomeRight;
