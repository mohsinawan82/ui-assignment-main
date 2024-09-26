import { Box, Typography } from "@mui/material";
import { IPicture } from "../../interface";

interface DrinkImageGridProps {
  pictures: Array<IPicture>;
}

const DrinkImageGrid = ({ pictures }: DrinkImageGridProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { md: "1fr 1fr 1fr", xs: "1fr" },
      gap: 2,
    }}
  >
    {pictures?.slice(0, 3)?.map((img, index) => (
      <ImageWithOverlay
        key={img.id}
        img={img}
        index={index}
        pictures={pictures}
      />
    ))}
    {pictures?.length === 0 && (
      <Box
        sx={{
          gridColumnStart: { md: 1 },
          gridColumnEnd: { md: 3 },
          maxHeight: { md: 412 },
          position: "relative",
        }}
      >
        <img
          style={{
            width: "100%",
            objectFit: "fill",
            height: "100%",
            borderRadius: 10,
            position: "relative",
            zIndex: 0,
          }}
          src={`/images.jfif`}
          alt=""
        />
      </Box>
    )}
  </Box>
);

const ImageWithOverlay = ({
  img,
  index,
  pictures,
}: {
  img: { path: string };
  index: number;
  pictures: IPicture[];
}) => (
  <Box
    sx={{
      gridColumnStart: { md: index === 0 ? 1 : undefined },
      gridColumnEnd: { md: index === 0 ? 3 : undefined },
      gridRowStart: { md: index === 0 ? 1 : undefined },
      gridRowEnd: { md: index === 0 ? 3 : undefined },
      maxHeight: { md: index === 0 ? 414 : 200 },
      position: "relative",
    }}
  >
    {index === 2 && pictures.length > 3 && (
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography> +{pictures.length - 2} more </Typography>
      </Box>
    )}
    <img
      style={{
        width: "100%",
        objectFit: "fill",
        height: "100%",
        borderRadius: 10,
        position: "relative",
        zIndex: 0,
      }}
      src={`http://localhost:4000/${img.path}`}
      alt=""
    />
  </Box>
);

export default DrinkImageGrid;
