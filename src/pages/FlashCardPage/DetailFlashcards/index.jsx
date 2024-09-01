import { Box, Paper, Typography, IconButton, Avatar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";

import MiniFlashcard from "./MiniFlashcard";
import { calculateTimeSince } from "~/utils/timeUtils";

// demo data flashcards
const flashcardsData = {
  _id: "flashcards-id-01",
  title: "Flashcards",
  userId: "2",
  description: "Learn English with Flashcards",
  flashcardOrderIds: ["flashcard-id-01", "flashcard-id-02", "flashcard-id-03"],
  createdAt: "2021-12-01T00:00:00.000Z",
  updatedAt: "2021-12-01T00:00:00.000Z",
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

// demo data user
const user = {
  id: 2,
  username: "sagiri",
  email: "sagiri123@g.vc",
  profile: {
    firstName: "Sagiri",
    lastName: "Izumi",
    avatar:
      "https://res.cloudinary.com/dkidy104q/image/upload/v1724988336/uploads/1724988332868-1667189565554.jpg.jpg",
  },
};

function DetailFlashcards() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 2,
        width: "60%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <IconButton>
            <Avatar
              alt={user.id}
              src={user.profile.avatar}
              sx={{ width: "48px", height: "48px" }}
            />
          </IconButton>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Create by
            </Typography>
            <Typography fontWeight="600">
              {user.profile.firstName} {user.profile.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created {calculateTimeSince(flashcardsData.createdAt)} ago
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
      </Paper>

      <Typography fontWeight="600" fontSize="1.5rem">
        Terms in this set ({flashcardsData.flashcards.length})
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {flashcardsData.flashcards.map((flashcard) => (
          <MiniFlashcard key={flashcard._id} flashcard={flashcard} />
        ))}
      </Box>
    </Box>
  );
}

export default DetailFlashcards;
