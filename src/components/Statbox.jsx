import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "../components/Progress";

const StatBox = ({ title, subtitle, icon, progress, increase, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: colors.primary[400],
        "&:hover": {
          backgroundColor: colors.primary[500],
        },
      }}
    >
      <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box 
          >
            {icon}
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <ProgressCircle progress={progress} />
            
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography
            variant="h6"
            sx={{ color: colors.greenAccent[500], fontStyle:"italic" }}
          >
            {subtitle}
          </Typography>
          <Box display="flex" justifyContent="space-evenly">
            <Typography
              variant="h5"
              fontStyle="italic"
              sx={{ color: colors.greenAccent[500] }}
            >
              completed&nbsp;
            </Typography>
            <Typography
              variant="h5"
              fontStyle="italic"
              sx={{ color: colors.greenAccent[600] }}
              fontFamily="cursive"
            >
              {increase}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Button>
  );
};

export default StatBox;

