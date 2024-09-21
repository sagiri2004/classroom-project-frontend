import React, { useState, forwardRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "~/api/apiClient";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import AddBoxIcon from "@mui/icons-material/AddBox";

const AlertDialog = forwardRef((currentFLashcardSet, ref) => {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState([]);

  useEffect(() => {
    if (!open) return;
    apiClient.get("/library/my-flashcard-sets").then((response) => {
      const { data } = response.data;
      setFlashcardSets(data);
      setIsLoading(false);
    });
    // set checked
    currentFLashcardSet.currentFLashcardSet.map((flashcardSet) => {
      setChecked((prev) => [...prev, flashcardSet]);
    });
  }, [open]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const folderId = useParams().id;

  const handleAdd = async() => {
    // call api
    await apiClient.put(`/library/folder/${currentFLashcardSet.id}`, {
      folderId: folderId,
      flashcardSetIds: checked,
    });
    setOpenSnackbar(true);
    setOpen(false);
    // reload page
    window.location.reload();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // neu dong thi xoa toan bo state
  useEffect(() => {
    if (!open) {
      setChecked([]);
    }
  }, [open]);

  return (
    <Box ref={ref}>
      <IconButton onClick={handleClickOpen}>
        <AddBoxIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Flashcard Set</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box id="scroll-dialog-description" tabIndex={-1}>
              <List sx={{ width: "100%", height: "70%" }}>
                {flashcardSets.map((flashcardSet) => {
                  const labelId = `checkbox-list-label-${flashcardSet.id}`;
                  return (
                    <ListItem key={flashcardSet.id} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(flashcardSet.id)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(flashcardSet.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={flashcardSet.title}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}
        </DialogContent>

        <DialogActions id="scroll-dialog-description">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default AlertDialog;
