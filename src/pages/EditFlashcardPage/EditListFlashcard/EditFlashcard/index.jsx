import { Paper, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  Input,
  FormHelperText,
  IconButton,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";

function EditFlashcard({ id = "", flashcard }) {
  const [word, setWord] = useState(flashcard.word);
  const [definition, setDefinition] = useState(flashcard.definition);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: flashcard._id,
    data: { ...flashcard },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      key={flashcard._id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        px: 4,
        minHeight: "150px",
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{id}</Typography>
        <Box>
          <IconButton
            sx={{
              height: "30px",
              width: "30px",
            }}
          >
            <DragHandleIcon />
          </IconButton>
          <IconButton
            sx={{
              height: "30px",
              width: "30px",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-word"
            aria-describedby="standard-word-helper-text"
            inputProps={{
              "aria-label": "Word",
            }}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <FormHelperText id="standard-word-helper-text">Word</FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-definition"
            aria-describedby="standard-definition-helper-text"
            inputProps={{
              "aria-label": "Definition",
            }}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
          <FormHelperText id="standard-definition-helper-text">
            Definition
          </FormHelperText>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default EditFlashcard;
