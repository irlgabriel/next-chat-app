"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  SvgIcon,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatContainer from "../../components/ChatContainer";
import UserList from "components/components/UserList";
import { CloseSharp, SearchSharp } from "@mui/icons-material";
import Avatar from "avataaars";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Message, User } from "../../../types";
import { LOGGED_IN_USER } from "../../../consts";

export default function Chat() {
  const theme = useTheme();

  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: "SOME TEXT", timestamp: Date.now(), user: LOGGED_IN_USER },
  ]);

  useEffect(() => {
    if (!selectedUser) return;

    setMessages([]);

    if (chatBodyRef && chatBodyRef.current) {
      chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);
    }
  }, [selectedUser, setMessages]);

  useEffect(() => {}, [messages, chatBodyRef]);

  const onSubmitSearch = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const query = data.get("query") as string;
    // find element;
    if (query && chatBodyRef?.current) {
      const elements = chatBodyRef.current.querySelectorAll(".message");

      let element: Element | null = null;
      elements.forEach((el) => {
        if (el.textContent?.toLowerCase().includes(query.toLowerCase())) {
          element = el;
          return;
        }
      });

      if (element && chatBodyRef?.current) {
        chatBodyRef.current.scrollTo({
          behavior: "smooth",
          top: (element as HTMLDivElement).offsetTop,
        });
      }
    }
  }, []);

  return (
    <Container
      sx={{
        padding: theme.spacing(2),
        height: "100vh",
      }}
    >
      {/**
       * TOP NAV BAR
       */}
      <AppBar
        sx={{
          marginBottom: theme.spacing(4),
          borderRadius: "8px",
          background: theme.palette.background.paper,
        }}
        position="static"
        elevation={2}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <SearchSharp
            sx={{ marginRight: theme.spacing(1) }}
            color="action"
            fontSize="large"
          />
          <InputBase type="text" placeholder="Search..." />
          <Typography></Typography>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={2}
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Grid
          sx={{
            maxHeight: "calc(100vh - 128px)",
            height: "calc(100vh - 128px)",
          }}
          container
        >
          <Grid sx={{ maxHeight: "100%" }} xs={4}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar
                sx={{
                  height: "82px",
                  flexDirection: "row",
                  alignItems: "center",
                  background: theme.palette.background.paper,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
                elevation={2}
                position="static"
              >
                <Toolbar>
                  <Avatar
                    style={{ width: "48px", height: "48px" }}
                    avatarStyle="Circle"
                  />
                  <SvgIcon />

                  <InputBase
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      paddingLeft: theme.spacing(1),
                      paddingRight: theme.spacing(1),
                      marginLeft: theme.spacing(2),
                    }}
                    placeholder="Search..."
                    type="text"
                  />
                </Toolbar>
              </AppBar>
            </Box>
            <UserList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </Grid>
          <Grid sx={{ maxHeight: "100%" }} xs={8}>
            {selectedUser ? (
              <>
                <Box>
                  <AppBar
                    sx={{
                      height: "82px",
                      alignItems: "center",
                      flexDirection: "row",
                      background: theme.palette.background.paper,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                    elevation={2}
                    position="static"
                  >
                    <Toolbar sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        component="form"
                        onSubmit={onSubmitSearch}
                      >
                        <button hidden type="submit" />
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
                          <Typography color="GrayText" variant="body2">
                            {selectedUser.name}
                          </Typography>
                          <Typography color="GrayText" variant="caption">
                            {selectedUser.role}
                          </Typography>
                        </Box>

                        {/** RIGHT  */}
                        {showSearch ? (
                          <Box
                            sx={{
                              width: "300px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              boxShadow: theme.shadows[1],
                              padding: theme.spacing(1),
                              borderRadius: "4px",
                            }}
                          >
                            <InputBase
                              fullWidth
                              placeholder="Search..."
                              type="text"
                              name="query"
                            />

                            <CloseSharp
                              onClick={() => setShowSearch(false)}
                              sx={{ cursor: "pointer" }}
                              color="action"
                              fontSize="medium"
                            />
                          </Box>
                        ) : (
                          <SearchSharp
                            sx={{ marginLeft: "auto", cursor: "pointer" }}
                            fontSize="large"
                            color="action"
                            onClick={() => {
                              console.log("clicked");
                              setShowSearch((search) => !search);
                            }}
                          />
                        )}
                      </Box>
                    </Toolbar>
                  </AppBar>
                </Box>

                <ChatContainer
                  ref={chatBodyRef}
                  messages={messages}
                  setMessages={setMessages}
                  to={selectedUser}
                  from={LOGGED_IN_USER}
                />
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
