import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#cffc03",
    },
    secondary: {
      main: "#f30661", //????TODO??????
    },

    /*  success: {
      main: "#90fc03",
    }, */
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          // Some CSS

          borderRadius: "0.6rem",
        },
        // Name of the slot
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // Some CSS

          borderRadius: "0.6rem",
        },
        // Name of the slot
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Some CSS

          borderRadius: "0.6rem",
          backgroundColor: "unset",
        },
        // Name of the slot
      },
    },
  },
});

export default theme;
