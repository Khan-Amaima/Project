import { createTheme } from "@mui/material/styles";
import AppColors from "./AppColors";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: "3px",

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: AppColors.grey,
            },
            "&:hover fieldset": {
              borderColor: AppColors.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: AppColors.primary,
            },
          },
        },
      },
    },
  },
});
export default theme;
