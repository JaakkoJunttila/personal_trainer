import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
 
export default function AddTraining(props) {
    const [training, setTrining] = useState({date: '', activity: '', duration: '', customer: props.params.links[1].href});
    const [open, setOpen] = useState(false);
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setTrining({...training, [event.target.name]: event.target.value});
    };

    const handleSave= () => {
        props.addTraining(training);
        handleClose();
    };

    return (
        <div>
        <Button color="default" size="small" onClick={handleClickOpen}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New training</DialogTitle>
            <DialogContent>
            <form noValidate>
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    onChange={inputChanged}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
            <TextField
                margin="dense"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                label="Activity"
                fullWidth
            />
            <TextField
                value={training.duration}
                margin="dense"
                name="duration"
                label="Duration"
                onChange={inputChanged}
                placeholder='Minutes'
                inputProps={{
                    step: 15,
                    min: 0,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}