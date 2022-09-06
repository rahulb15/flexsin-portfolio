import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = { 
	id: null, 
	name: "",
  email: ""
}

const FormDialogEditFeatures = (props) => {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState(initialFormState);
  const [errors, setErrors ] = useState({})

  const handleClickOpen = () => {
      setErrors({});
      setFeatures({
        id : props.dataFeatures[0],
        name : props.dataFeatures[1],
        
      })
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleInputChange = event => {
		const { name, value } = event.target
    setFeatures({ ...features, [name]: value })
  }
  
  const validate = () => {
      let tempErrors = {};
      let formIsValid = true;

      if(!features.name || features.name.trim() ===  ""){
        formIsValid = false;
        tempErrors["name"] = "Cannot be empty";
      }
      setErrors(tempErrors);
      return formIsValid;
  }

  const handleSubmit = (e) => {
      const onSuccess = () => {
          setOpen(false);
          toast.success('Data succesfully updated');
      }
      e.preventDefault();

      if(validate()){
        props.update(features.id, features, onSuccess)
      }
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon />
      </IconButton>
      <Dialog  
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Edit Features</DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
                
                <TextField
                  autoFocus
                  name="name"
                  label="Name"
                  value={features.name}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                />

                {/* <br /><br />

                <TextField
                  name="email"
                  label="Email"
                  value={features.email}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.email && { error: true, helperText: errors.email })}
                /> */}

            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Save
                </Button>
            </DialogActions>

      </Dialog>
    </div>
  );
}

export default FormDialogEditFeatures;