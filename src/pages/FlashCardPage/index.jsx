import { Box } from "@mui/material";
import IntroFlashcards from "./IntroFlashcards";
import DetailFlashcards from "./DetailFlashcards";

function FlashCardPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IntroFlashcards />
      <DetailFlashcards />
    </Box>
  );
}

export default FlashCardPage;
