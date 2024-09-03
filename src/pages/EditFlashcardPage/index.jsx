import { Box } from "@mui/material";

import EditTitleForm from "./EditTitleFrom";
import EditListFlashcard from "./EditListFlashcard";

const flashcardsData = {
  _id: "flashcards-id-01",
  title: "Flashcards",
  description: "Learn English with Flashcards",
  flashcardOrderIds: ["flashcard-id-01", "flashcard-id-02", "flashcard-id-03"],
  flashcards: [
    {
      _id: "flashcard-id-01",
      word: "Apple",
      definition: "Quả táo",
    },
    {
      _id: "flashcard-id-02",
      word: "Banana",
      definition: "Quả chuối",
    },
    {
      _id: "flashcard-id-03",
      word: "Orange",
      definition: "Quả cam",
    },
  ],
};

function EditFlashcardPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <EditTitleForm
        title={flashcardsData.title}
        description={flashcardsData.description}
      />
      <Box width="80%" sx={{
        mt: 4,
      }}>
        <EditListFlashcard flashcards={flashcardsData.flashcards} flashcardOrderIds={flashcardsData.flashcardOrderIds} />
      </Box>
    </Box>
  );
}

export default EditFlashcardPage;
