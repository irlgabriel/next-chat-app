import { alpha, Box, Typography, useTheme } from "@mui/material";
import Avatar from "avataaars";
import { User } from "../../types";
import { USERS } from "../../consts";

interface Props {
  selectedUser: User | null;
  onSelectUser: (user: User | null) => void;
}

export default function UserList({ selectedUser, onSelectUser }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        height: "100%",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {USERS.map(({ role, name }, idx) => (
        <Box
          key={`user-${idx}`}
          sx={{
            padding: theme.spacing(2),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            "border-radius": "8px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            cursor: "pointer",
            ":hover": {
              ...(selectedUser?.name !== name
                ? {
                    backgroundColor: alpha(
                      theme.palette.background.default,
                      0.7
                    ),
                    color: theme.palette.getContrastText(
                      alpha(theme.palette.background.default, 0.7)
                    ),
                  }
                : {}),
            },
            ...(selectedUser?.name === name
              ? {
                  backgroundColor: alpha(theme.palette.primary.main, 0.4),
                  color: theme.palette.common.black,
                }
              : {}),
            ...(idx === 0 ? { marginTop: theme.spacing(1) } : {}),
            transition: "background-color 0.3s ease",
          }}
          onClick={() => onSelectUser({ name, role })}
        >
          {/**@ts-ignore */}
          <Avatar
            style={{ width: "48px", height: "48px" }}
            avatarStyle="Circle"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: theme.spacing(2),
              marginRight: "auto",
            }}
          >
            <Typography variant="body2">{name}</Typography>
            <Typography variant="caption">Software Developer</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
