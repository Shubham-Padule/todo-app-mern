import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TablePagination,
  TextField,
  Box,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // for search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // default 5 items per page
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const []

  const fetchTodos = async () => {
    const res = await api.get("/");
    setTodos(res.data);
  };

  // Example after a successful deletion
  const handleDelete = async (id) => {
    await api.delete(`/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
    setSnackbarMessage("Todo deleted successfully!");
    setOpenSnackbar(true);
  };

  const handleToggle = async (todo) => {
    const updated = { ...todo, completed: !todo.completed };
    const res = await api.put(`/${todo._id}`, updated);
    setTodos((prev) => prev.map((t) => (t._id === todo._id ? res.data : t)));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Filter todos based on the search term
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slice the filtered data for pagination
  const paginatedTodos = filteredTodos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        {/* Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
          <TextField
            label="Search Todo"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
        </Box>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>✔️</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTodos.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "gray" : "inherit",
                  }}
                >
                  {todo.title}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(todo._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTodos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

    </>
  );
}
