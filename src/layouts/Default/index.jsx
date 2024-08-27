import { Box } from "@mui/material";

import Header from "../components/Header";

function Default({ children }) {
  return (
    <Box bgcolor={"bg-main"} sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    }}>
      <Header />
      {children}
    </Box>
  );
}

export default Default;
