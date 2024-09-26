import { Typography } from "@mui/material";

interface DrinkInfoProps {
  name: string;
  description: string;
}

const DrinkInfo = ({ name, description }: DrinkInfoProps) => (
  <>
    <Typography sx={{ fontSize: 30, fontWeight: 500, marginTop: 1 }}>{name}</Typography>
    <Typography sx={{ fontSize: 24, fontWeight: 400, marginTop: 1, color: "#666666" }}>
      {description}
    </Typography>
  </>
);

export default DrinkInfo;
