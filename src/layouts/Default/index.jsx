import { Box } from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import theme from "~/theme";

function Default({ children }) {
  return (
    <Box
      bgcolor={"bg-main"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <Sidebar /> 
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            paddingTop: (theme) => theme.custom.headerHeight,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Default;
