import { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
  Box,
  AppBar,
  Toolbar
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const handleAdd = () => {
    setRefresh(!refresh);
  };

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 🔷 AppBar on Top */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">📝 Todo App</Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 🧾 Main Content */}
      <Container maxWidth="100">
        <Paper elevation={4} sx={{ padding: 4, marginTop: 4 }}>
          <TodoForm onAdd={handleAdd} />
          <TodoList key={refresh} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
