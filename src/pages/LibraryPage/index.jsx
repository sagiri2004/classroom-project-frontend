import {
  Box,
  Typography,
  Button,
  Paper,
  Tab,
  Tabs,
  Avatar,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import apiClient from "~/api/apiClient";

// // fake data api
// const flashcardSets = [
//   {
//     id: 1,
//     title: "Flashcard set 1",
//     count: 10,
//     authorName: "Author 1",
//     authorAvatar: "https://www.w3schools.com/howto/img_avatar.png",
//   },
//   {
//     id: 2,
//     title: "Flashcard set 2",
//     count: 20,
//     authorName: "Author 2",
//     authorAvatar: "https://www.w3schools.com/howto/img_avatar.png",
//   },
//   {
//     id: 3,
//     title: "Flashcard set 3",
//     count: 30,
//     authorName: "Author 3",
//     authorAvatar: "https://www.w3schools.com/howto/img_avatar.png",
//   },
// ];

// const folders = [
//   {
//     id: 1,
//     title: "Folder 1",
//     count: 10,
//   },
//   {
//     id: 2,
//     title: "Folder 2",
//     count: 20,
//   },
// ];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FlashcardSet = ({ title, count, authorName, authorAvatar, onClick }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2,
        border: "1px solid",
        borderColor: "transparent",

        "&:hover": {
          cursor: "pointer",
          border: "1px solid #ccc",
        },
      }}
      onClick={onClick}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="subtitle1">{count} terms</Typography>
        <Divider orientation="vertical" flexItem />
        <Avatar
          alt={authorName}
          src={authorAvatar}
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="subtitle1">{authorName}</Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="h6">{title}</Typography>
      </Box>
    </Paper>
  );
};

const Folder = ({ name, count, onClick }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2,
        border: "1px solid",
        borderColor: "transparent",

        "&:hover": {
          cursor: "pointer",
          border: "1px solid #ccc",
        },
      }}
      onClick={onClick}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="subtitle1">{count} items</Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="h6">{name}</Typography>
      </Box>
    </Paper>
  );
};

function LibraryPage() {
  const [value, setValue] = useState(0);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [folders, setFolders] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/library");
        console.log("response", response);
        setFlashcardSets(response.data.data.flashcardSets);
        setFolders(response.data.data.folders);
        setUser(response.data.data.profile);
      } catch (error) {
        console.error("Fetch data error", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handelClickFlashcardSet = (id) => {
    // chuyen den trang chi tiet flashcard set
    window.location.href = `/flashcards/${id}`;
  };

  const handelClickFolder = (id) => {
    window.location.href = `/folders/${id}`;
  };

  return (
    <Box height="100%" p={5} px={7}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="h4">Library</Typography>
        </Box>
        <Box sx={{ width: "70%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Flashcard sets" {...a11yProps(0)} />
              <Tab label="Folder" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box display="flex" gap={2} flexDirection="column">
              {flashcardSets?.map((flashcardSet) => (
                <FlashcardSet
                  key={flashcardSet.id}
                  id={flashcardSet.id}
                  title={flashcardSet.title}
                  count={flashcardSet.count}
                  authorName={user.fullName}
                  authorAvatar={user.avatar}
                  onClick={() => handelClickFlashcardSet(flashcardSet.id)}
                />
              ))}
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box display="flex" gap={2} flexDirection="column">
              {folders?.map((folder) => (
                <Folder
                  key={folder.id}
                  name={folder.name}
                  count={folder.count}
                  onClick={() => handelClickFolder(folder.id)}
                />
              ))}
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}

export default LibraryPage;
