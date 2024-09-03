import { Box, FormControl, Input, FormHelperText, Button } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EditTitleForm({ title, description }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="text" startIcon={<ArrowBackIcon />} sx={{
            textTransform: "none",
        }}>
          Back to set
        </Button>
        <Button variant="contained" endIcon={<DoneIcon />}>
          SAVE
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-title"
            aria-describedby="standard-title-helper-text"
            inputProps={{
              "aria-label": "TITLE",
            }}
            value={title}
          />
          <FormHelperText id="standard-title-helper-text">TITLE</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-description"
            aria-describedby="standard-description-helper-text"
            inputProps={{
              "aria-label": "DESCRIPTION",
            }}
            value={description}
          />
          <FormHelperText id="standard-description-helper-text">
            DESCRIPTION
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}

export default EditTitleForm;
