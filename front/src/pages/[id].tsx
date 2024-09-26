import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../components/create-drink/form-field";
import PictureGallery from "../components/create-drink/picture-gallery";
import { addTask, updateTaskAsync } from "../redux/taskSlice";
import { IAddDrink, IDrink } from "../interface";
import { AppDispatch, RootState } from "../redux/store";

const CreateTask: React.FC = () => {
  const descriptionElement = useRef<HTMLTextAreaElement>(null);
  const titleElement = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const drinks = useSelector((state: RootState) => state.drinks.drinks);
  const [isEditable, setIsEditable] = useState(true);
  const { id } = useParams();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (id !== "new") {
      const updatedObj: IDrink = {
        ...drinks.items[0],
        name: titleElement.current?.value || "",
        description: descriptionElement.current?.value || "",
      };
      dispatch(
        updateTaskAsync({
          id: drinks.items[0].id || "",
          drink: updatedObj,
          type: "UPDATE_TASK",
        })
      );
      navigation("/");
    } else {
      const postObj: IAddDrink = {
        name: titleElement.current?.value ?? "",
        description: descriptionElement.current?.value ?? "",
      };
      dispatch(addTask(postObj));
      titleElement.current!.value = "";
      descriptionElement.current!.value = "";
      navigation("/");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setIsEditable(true);
      if (titleElement.current)
        titleElement.current.value = drinks.items[0].name;
      if (descriptionElement.current)
        descriptionElement.current.value = drinks.items[0].description;
    } else {
      setIsEditable(false);
      if (titleElement.current) titleElement.current.value = "";
      if (descriptionElement.current) descriptionElement.current.value = "";
    }
  }, [id, drinks]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            {id !== "new" ? "Detail" : "Create Drink"}
          </Typography>
          {id !== "new" && (
            <Button
              variant="outlined"
              onClick={() => {
                setIsEditable(!isEditable);
              }}
            >
              Edit
            </Button>
          )}
        </Box>

        <Box sx={{ mt: 3, display: "grid", gap: 3 }}>
          <FormField
            label="Title"
            inputRef={titleElement}
            placeholder="Enter Title"
            disabled={isEditable}
          />
          <FormField
            label="Description"
            inputRef={descriptionElement}
            placeholder="Enter the description"
            multiline
            rows={3}
            disabled={isEditable}
          />
          {id !== "new" && drinks.items[0].Pictures && (
            <PictureGallery
              pictures={drinks.items[0].Pictures}
              drinkId={parseInt(drinks.items[0].id || "0")}
            />
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#6F4E37", "&:hover": { bgcolor: "#ECB176" } }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTask;
