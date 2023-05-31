import React, { useState, useCallback } from 'react';
import { TextField, Button, List, ListItem, ListItemButton, Divider, Alert, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import './index.css'
import profilePicture from "../../../../assets/images/user.png"
import { useDispatch } from 'react-redux';
import { addAccount } from '../../../../redux/chatSlice';



function LeftSide({ contactCB }) {
    const dispatch = useDispatch();
    const [contacts, setContacts] = useState([]);
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const phoneValid = register(
        "phoneNumber",
        {
            required: "Phone number required!",
            pattern: {
                value: /^\+[1-9][0-9]{7,14}$/,
                message: "Incorrect number!"
            },
            minLength: {
                value: 8,
                message: "7 digits at least!"
            },
            maxLength: {
                value: 16,
                message: "Not more 15 digits!"
            },
            validate: (fieldValue) => { return contacts.includes(fieldValue) ? 'This contact exist!' : null }
        }
    )

    const onSubmit = (data) => {
        if (!contacts.includes(data.phoneNumber)) {
            setContacts([...contacts, data.phoneNumber])
            dispatch(addAccount(data.phoneNumber))
        }
    }

    const handleBlur = () => {
        clearErrors("phoneNumber")
    }

    return (
        <section className="left">
            <div className="profile">
                <img src={profilePicture} />
            </div>
            <div className="wrap-search">
                <form className="search" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <TextField
                                className="input-search"
                                size='small'
                                label="Type Phone Number"
                                variant="outlined"
                                margin="dense"
                                inputProps={phoneValid}
                                color="success"
                                onBlur={ handleBlur }
                            />
                        </Grid>
                        <Grid
                            item xs={2}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button type='submit' variant="text">
                                <AddIcon/>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ position: "absolute", bottom: "100%", left: "50px", zIndex: "1000" }}>
                            {errors.phoneNumber && <Alert severity="error">{errors.phoneNumber?.message}</Alert>}
                        </Grid>
                    </Grid>
                    
                    
                </form>
            </div>
            <List sx={{ height: 'calc(100% - 129px)', bgcolor: 'background.paper', overflowY: "scroll" }}>
                {
                    contacts.map((phone) => 
                        <div key={phone}>
                            <ListItem disablePadding >
                                <ListItemButton onClick={() => { contactCB(phone) }}>
                                    {phone}
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </div>
                    )
                }
            </List>
        </section>
    );
}

export default LeftSide;