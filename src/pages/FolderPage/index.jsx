import apiClient from "~/api/apiClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import FlashcardSet from "./FlashcardSet";
import AlertDialog from "./DialogAddFlashcardSet";

function FolderPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [flashcardSets, setFlashcardSets] = useState([]);

  useEffect(() => {
    apiClient.get(`/library/folder/${id}`).then((response) => {
      const { data } = response.data;
      setName(data.folderName);
      setFlashcardSets(data.flashcardSets);
    });
  }, [id]);

  const handleClickFlashcardSet = (flashcardSetId) => {
    // chuyen den trang chi tiet flashcard set
    window.location.href = `/flashcards/${flashcardSetId}`;
  };

  const handleRemoveFlashcardSet = (flashcardSetId) => {
    // xoa flashcard set
    console.log("Remove flashcard set", flashcardSetId);
  };

  return (
    <Box height="100%" p={5} px={7}>
      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        sx={{ width: "70%" }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <AlertDialog />
          <Tooltip title="Delete folder">
            <IconButton>
              <DeleteIcon
                sx={{
                  color: "red",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ width: "70%" }}>
        <Box display="flex" gap={2} flexDirection="column">
          {flashcardSets?.map((flashcardSet) => (
            <FlashcardSet
              key={flashcardSet.flashcardSetId}
              id={flashcardSet.flashcardSetId}
              title={flashcardSet.title}
              authorName={flashcardSet.author.name}
              authorAvatar={flashcardSet.author.avatar}
              handleClickFlashcardSet={() =>
                handleClickFlashcardSet(flashcardSet.flashcardSetId)
              }
              handleRemoveFlashcardSet={() =>
                handleRemoveFlashcardSet(flashcardSet.flashcardSetId)
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default FolderPage;
