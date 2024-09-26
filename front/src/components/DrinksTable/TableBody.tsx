import React from "react";
import { Button, IconButton, Box, Typography, Rating } from "@mui/material";
import { DeleteOutline, EditNote} from "@mui/icons-material";
import { IDrink } from "../../interface";

interface TableBodyProps {
  drinks: IDrink[];
  onView: (drink: IDrink) => void;
  onDelete: (drinkId: string) => void;
  onShowReviews: (drinkId: string) => void;
  onEdit: (drink: IDrink) => void;
}

const TableBodyComponent: React.FC<TableBodyProps> = ({
  drinks,
  onView,
  onEdit,
  onDelete,
  onShowReviews,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "space-evenly",
        gridTemplateColumns: {
          lg: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)",
          sm: "repeat(2, 1fr)",
          xs: "repeat(1, 1fr)",
        },
        gap: { lg: 4, sm: 2 },
        mt: 5,
      }}
    >
      {drinks.map((drink) => (
        <Box
          sx={{ backgroundColor: "white", borderRadius: 2, marginTop: 3 }}
          width={"100%"}
          padding={1}
        >
          <Box position={"relative"}>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                gap: 0.5,
                padding: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  onEdit(drink);
                }}
                sx={{ width: 20, height: 20 }}
              >
                <EditNote sx={{ color: "white", width: 20, height: 20 }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  onDelete(drink.id || "");
                }}
                sx={{ width: 20, height: 20 }}
              >
                <DeleteOutline sx={{ color: "red", width: 20, height: 20 }} />
              </IconButton>
            </Box>
            {drink.Pictures && drink.Pictures?.length > 0 ? (
              <img
                src={`http://localhost:4000/${drink?.Pictures?.[0].path}`}
                width={"100%"}
                alt="hello"
                height={250}
                style={{ borderRadius: 8 }}
              />
            ) : (
              <img
                src={`/images.jfif`}
                width={"100%"}
                alt="hello"
                height={250}
                style={{ borderRadius: 8 }}
              />
            )}
          </Box>
          <Box paddingX={1}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {drink.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: "#666666",
                fontWeight: 400,
                marginTop: 0.5,
              }}
            >
              {drink.description}
            </Typography>
            <Box
              mt={1}
              sx={{
                backgroundColor: "#F7F8FA",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingY: 1,
                paddingLeft: 1,
              }}
            >
              <Rating
                name="read-only"
                value={drink.reviewAverageRating}
                readOnly
              />
              <Typography
                sx={{
                  color: "#687D94",
                  fontSize: 12,
                  fontWeight: 400,
                  paddingLeft: 1,
                }}
              >
                {drink.reviewAverageRating?.toFixed(1) || 0}/5
              </Typography>
            </Box>
            <Button sx={{ backgroundColor: "#4F46E5", marginTop: 2 }}>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 500,
                  fontSize: 12,
                }}
                onClick={() => onView(drink)}
              >
                View
              </Typography>
            </Button>
          </Box>
        </Box>

        // <TableRow key={drink.id}>
        //   <TableCell>{drink.name}</TableCell>
        //   <TableCell>{drink.description}</TableCell>
        //   <TableCell align="right">
        //     {drink.reviewAverageRating ?? "No Rating"}
        //   </TableCell>
        //   <TableCell align="right">
        //     <Button onClick={() => onView(drink)}>View</Button>
        //   </TableCell>
        //   <TableCell align="right">
        //     <Button onClick={() => onShowReviews(drink.id || "")}>
        //       Reviews
        //     </Button>
        //   </TableCell>
        //   <TableCell align="right">
        //     <IconButton onClick={() => onDelete(drink.id || "")}>
        //       <DeleteOutline color="error" />
        //     </IconButton>
        //   </TableCell>
        // </TableRow>
      ))}
    </Box>
  );
};

export default TableBodyComponent;
