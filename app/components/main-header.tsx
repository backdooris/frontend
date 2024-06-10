import HomeIcon from "@mui/icons-material/Home";
import { Box, Stack, StackProps, Typography } from "@mui/joy";

export function MainHeader(props: MainHeaderProps): JSX.Element {
  const { sx, ...other } = props;

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
      <Typography level="h1">LOGO</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HomeIcon sx={{ fontSize: 32 }} />
        <Typography level="h4">Home</Typography>
      </Box>
    </Stack>
  );
}

type MainHeaderProps = Omit<StackProps, "children">;
