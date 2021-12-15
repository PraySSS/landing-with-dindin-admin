import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const PlaceDialog = (props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={props.close}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>{props.formmode ? "Add New" : "Update"} Place</DialogTitle>
      <ValidatorForm onSubmit={props.addMap}>
        <DialogContent>
          <Grid container spacing={3}>
          <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Title"
                onChange={props.changetitle}
                name="title"
                value={props.title}
                validators={["required"]}
                errorMessages={["this field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Detail"
                onChange={props.changedetail}
                name="detail"
                value={props.detail}
                validators={["required"]}
                errorMessages={["this field is required"]}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="ImageURL"
                onChange={props.changeimageurl}
                name="imageurl"
                value={props.imageurl}
                validators={["required"]}
                errorMessages={["this field is required"]}
                autoComplete="off"
              />
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary">
            {props.formmode ? "Add" : "Update"}
          </Button>
          <Button onClick={props.close} color="primary">
            Close
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default PlaceDialog;
