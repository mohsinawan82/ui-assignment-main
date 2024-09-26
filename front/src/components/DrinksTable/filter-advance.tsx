import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { ArrowDownward } from "@mui/icons-material";

interface TableHeadProps {
  nameRef: React.MutableRefObject<string>;
  sortRef: React.MutableRefObject<string>;
  descriptionRef: React.MutableRefObject<string>;
  minRatingRef: React.MutableRefObject<number | undefined>;
  maxRatingRef: React.MutableRefObject<number | undefined>;
  descRef: React.MutableRefObject<string>;
  onFilterChange: () => void;
}

const TableHead: React.FC<TableHeadProps> = ({
  nameRef,
  descriptionRef,
  minRatingRef,
  maxRatingRef,
  descRef,
  sortRef,
  onFilterChange,
}) => {
  const handleFilterChange = () => {
    onFilterChange(); // This will trigger a re-fetch
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownward />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Advance Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Name"
                  defaultValue={nameRef.current}
                  onBlur={(e) => {
                    nameRef.current = e.target.value;
                  }}
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 3 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ borderRadius: 100 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Description"
                  defaultValue={descriptionRef.current}
                  onBlur={(e) => {
                    descriptionRef.current = e.target.value;
                  }}
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 3 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ borderRadius: 100 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Min Rating"
                  type="number"
                  defaultValue={minRatingRef.current}
                  onBlur={(e) => {
                    minRatingRef.current = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                  }}
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 3 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ borderRadius: 100 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Max Rating"
                  type="number"
                  defaultValue={maxRatingRef.current}
                  onBlur={(e) => {
                    maxRatingRef.current = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                  }}
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 3 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ borderRadius: 100 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Order"
                  defaultValue={sortRef.current}
                  variant="outlined"
                  fullWidth
                  InputProps={{ sx: { borderRadius: 3 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ borderRadius: 100 }}
                  onChange={(e) => {
                    sortRef.current = e.target.value;
                  }}
                >
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="description">Description</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Order"
                  defaultValue={descRef.current}
                  fullWidth
                  InputProps={{ sx: { borderRadius: 3 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ borderRadius: 100 }}
                  variant="outlined"
                  onChange={(e) => {
                    descRef.current = e.target.value;
                  }}
                >
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value="false">Ascending</MenuItem>
                  <MenuItem value="true">Descending</MenuItem>
                </TextField>
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  onClick={handleFilterChange}
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TableHead;
