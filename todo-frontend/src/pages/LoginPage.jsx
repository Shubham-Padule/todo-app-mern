// 📁 src/pages/LoginPage.js
import {
    Box, Button, TextField, Typography, Container, Paper
  } from "@mui/material";
  import { useState } from "react";
  import { useAuth } from "../context/AuthContext";
  import axios from "../api/api";
  import { useNavigate } from "react-router-dom";
  
  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/auth/login", { email, password });
        login(res.data);
        navigate("/dashboard");
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ padding: 4, mt: 8 }}>
          <Typography variant="h5" mb={3} align="center">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    );
  };
  
  export default LoginPage;