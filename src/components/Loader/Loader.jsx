import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row", 
        gap: 1, 
        padding: 2, 
      }}
    >
      <CircularProgress />
    </Box>
  );
}
