import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Flashcard from "./Flashcard";
import Footer from "./Footer";

// demo data flashcards
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

function IntroFlashcards() {
  // lấy ra danh sách flashcards
  const [flashcards, setFlashcards] = useState(flashcardsData.flashcards);
  // lấy ra flashcard hiện tại
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const currentFlashcard = flashcards[currentFlashcardIndex];

  // chuyển sang flashcard tiếp theo
  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    }
  };

  // chuyển sang flashcard trước đó
  const handlePrevFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    }
  };

  // xoay flashcard
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // nghe sự kiện từ bàn phím
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
        handleNextFlashcard();
        break;
      case "ArrowLeft":
        handlePrevFlashcard();
        break;
      case " ":
        handleFlip();
        break;
      case "ArrowUp":
        handleFlip();
        break;
      case "ArrowDown":
        handleFlip();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFlashcardIndex, isFlipped]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
      }}
    >
      <Header
        title={flashcardsData.title}
        description={flashcardsData.description}
      />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
        }}
      >
        <Flashcard
          data={currentFlashcard?.word}
          isFlipped={isFlipped}
          onClick={handleFlip}
        />
        <Flashcard
          data={currentFlashcard?.definition}
          backCard
          isFlipped={isFlipped}
          onClick={handleFlip}
        />
      </Box>
      <Footer
        handleNextFlashcard={handleNextFlashcard}
        handlePrevFlashcard={handlePrevFlashcard}
        currentFlashcardIndex={currentFlashcardIndex}
        flashcardsLength={flashcards.length}
      />
    </Box>
  );
}

export default IntroFlashcards;
