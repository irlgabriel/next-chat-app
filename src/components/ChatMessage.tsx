import { alpha, Box, Typography, useTheme } from "@mui/material";
import { Message } from "../../types";
import Avatar from "avataaars";
import { LOGGED_IN_USER } from "../../consts";
import { getChatTimeStamp } from "../../helpers";
import React from "react";

export default function ChatMessage({
  key,
  text,
  timestamp,
  user,
}: Message & { key: React.Key }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection:
            user.name === LOGGED_IN_USER.name ? "row" : "row-reverse",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            background: theme.palette.common.white,
            borderRadius: "8px",
            boxShadow: theme.shadows[1],
            padding: theme.spacing(1),
            ...(user.name === LOGGED_IN_USER.name
              ? {
                  backgroundColor: alpha(theme.palette.primary.main, 0.7),
                  color: theme.palette.getContrastText(
                    alpha(theme.palette.primary.main, 0.7)
                  ),
                  marginRight: theme.spacing(1),
                  marginLeft: "auto",
                }
              : {
                  marginLeft: theme.spacing(1),
                  marginRight: "auto",
                }),
          }}
        >
          <Typography
            className="message"
            dangerouslySetInnerHTML={{ __html: text }}
            variant="subtitle1"
            component="p"
          />
        </Box>
        <Avatar
          style={{
            width: "48px",
            height: "48px",
            minWidth: "48px",
            minHeight: "48px",
          }}
          avatarStyle="Circle"
        />
      </Box>
      <Box
        sx={{
          ...(user.name === LOGGED_IN_USER.name
            ? { paddingRight: "56px" }
            : { paddingLeft: "56px" }),
          display: "flex",
        }}
      >
        <Typography
          color="GrayText"
          sx={{
            ...(user.name === LOGGED_IN_USER.name
              ? { marginLeft: "auto" }
              : { marginRight: "auto" }),
          }}
          variant="caption"
          component="p"
        >
          {getChatTimeStamp(timestamp)}
        </Typography>
      </Box>
    </Box>
  );
}
