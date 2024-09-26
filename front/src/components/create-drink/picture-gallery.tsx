import { Box, IconButton } from "@mui/material";
import { CloseOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteDrinkPictureAsync,
  addDrinkPictureAsync,
} from "../../redux/taskSlice";
import { AppDispatch } from "../../redux/store";

interface PictureGalleryProps {
  pictures: { id: number; path: string }[];
  drinkId: number;
}

const PictureGallery: React.FC<PictureGalleryProps> = ({
  pictures,
  drinkId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (pictureId: number) => {
    dispatch(deleteDrinkPictureAsync({ drinkId, pictureId }));
  };

  const handleAddPicture = (file: File) => {
    dispatch(addDrinkPictureAsync({ drinkId, file }));
  };

  return (
    <Box display={"flex"} gap={2}>
      {pictures?.map((img) => (
        <Box
          sx={{
            backgroundImage: `url('http://localhost:4000/${img.path}')`,
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
          width={100}
          borderRadius={3}
          height={100}
          key={img.id}
        >
          <IconButton
            onClick={() => handleDelete(img.id)}
            sx={{ float: "right" }}
          >
            <CloseOutlined color="error" />
          </IconButton>
        </Box>
      ))}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={100}
        borderRadius={3}
        border="2px solid #1976d2"
        height={100}
      >
        <IconButton component="label">
          <AddCircleOutlineOutlined htmlColor="#1976d2" />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (file) {
                handleAddPicture(file);
              }
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PictureGallery;
