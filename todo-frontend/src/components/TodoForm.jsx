import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import api from "../api/api";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/", { title });
      onAdd(res.data);
      setTitle("");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} my={2}>
        <TextField
          label="New Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add"}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Todo added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
