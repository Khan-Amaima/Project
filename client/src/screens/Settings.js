import { Grid } from "@mui/material";
import AppColors from "../constants/AppColors";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";

function Settings() {
  return (
    <Grid
      container
      className="Main"
      gap={3}
      width={"auto"}
      sx={{ width: { xs: "100%", lg: "100%" } }}
      style={{
        borderColor: AppColors.primary,
        backgroundColor: "white",
        borderRadius: "10px",
        padding: 20,
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <UpdateProfile />
      <UpdatePassword />
    </Grid>
  );
}

export default Settings;
