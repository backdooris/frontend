import HomeIcon from "@mui/icons-material/Home";
import { Box, Stack, StackProps, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export function MainHeader(props: MainHeaderProps): JSX.Element {
  const { sx, ...other } = props;
  const navigate = useNavigate();
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
      {...other}
    >
      <Typography
        sx={{
          cursor: "pointer",
        }}
        level="h1"
        onClick={() => {
          navigate("/");
        }}
      >
        LOGO
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <HomeIcon sx={{ fontSize: 32 }} />
        <Typography level="h4">Home</Typography>
      </Box>
    </Stack>
  );
}

type MainHeaderProps = Omit<StackProps, "children">;
