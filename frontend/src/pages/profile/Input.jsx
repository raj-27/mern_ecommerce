import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
const Input = ({
  name,
  handleChange,
  value,
  label,
  half,
  autoFocus,
  type,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      value={value}
      name={name}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
  </Grid>
);

export default Input;
