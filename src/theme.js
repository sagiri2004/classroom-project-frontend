// theme.js
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const HEADER_HEIGHT = "56px";
const DRAWER_WIDTH_MAX = "240px";
const DRAWER_WIDTH_MIN = "64px";
const MAIN_CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT})`;

// Tạo theme với các tùy chỉnh cho light và dark mode
const theme = extendTheme({
  custom: {
    headerHeight: HEADER_HEIGHT,
    mainContentHeight: MAIN_CONTENT_HEIGHT,
    drawerWidthMax: DRAWER_WIDTH_MAX,
    drawerWidthMin: DRAWER_WIDTH_MIN,
  },

  colorSchemes: {
    light: {
      palette: {
        "bg-header": "#FFFFFF",
        "bg-sidebar": "#FFFFFF",
        sidebar: "#FFFFFF",
        "bg-main": "#F0F2F5",
      },
    },
    dark: {
      palette: {
        "bg-header": "#242526",
        "bg-sidebar": "#242526",
        sidebar: "#242526",
        "bg-main": "#18191A",
      },
    },
  },

  // Tùy chỉnh scrollbar cho light và dark mode
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Tùy chỉnh cho light mode
        '*[data-mui-color-scheme="light"]': {
          // Sử dụng auto để thanh cuộn chỉ hiển thị khi cần thiết
          overflow: "auto", // Thay đổi từ overlay sang auto để tương thích tốt hơn
          "&::-webkit-scrollbar": {
            width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
            height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
          },

          // Ẩn thanh cuộn mặc định
          "&::-webkit-scrollbar": {
            width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
            height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d66efd",
            borderRadius: "50px",
            backgroundImage: "#242526",
          },

          // chỉnh scrollbar cho MuiDialogContent-root
          "& .MuiDialogContent-root": {
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
              height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
            },
            // Ẩn thanh cuộn mặc định
            "&::-webkit-scrollbar": {
              width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
              height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d66efd",
              borderRadius: "50px",
              backgroundImage: "#242526",
            },
          },
        },
        // Tùy chỉnh cho dark mode
        '*[data-mui-color-scheme="dark"]': {
          // Sử dụng auto để thanh cuộn chỉ hiển thị khi cần thiết
          overflow: "auto", // Thay đổi từ overlay sang auto để tương thích tốt hơn

          // Ẩn thanh cuộn mặc định
          "&::-webkit-scrollbar": {
            width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
            height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#686868",
            borderRadius: "50px",
            backgroundImage: "#1E1E1E",
          },
          "& .MuiDialogContent-root": {
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
              height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
            },
            // Ẩn thanh cuộn mặc định
            "&::-webkit-scrollbar": {
              width: "5px", // Đặt độ rộng của thanh cuộn nhỏ lại để không chiếm diện tích nhiều
              height: "5px", // Đặt độ cao của thanh cuộn nhỏ lại
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d66efd",
              borderRadius: "50px",
              backgroundImage: "#242526",
            },
          },
        },
      },
    },
  },
});

export default theme;
