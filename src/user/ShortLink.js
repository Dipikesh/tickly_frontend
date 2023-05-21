import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import Menu from '../core/Menu';
import { isAuthenticated } from "../auth";


import { Container, TextField, Checkbox, FormControlLabel, Select, MenuItem, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import axios from 'axios';
import { BACKEND_BASE_URL } from '../constant';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  colorPickerContainer: {
    marginTop: theme.spacing(2),
  },
  logoInput: {
    display: 'none',
  },
  logoInputLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  logoPreview: {
    maxWidth: '100%',
    maxHeight: '200px',
    margin: theme.spacing(2),
  },
  logoError: {
    color: 'red',
    margin: theme.spacing(1),
  },
}));

const ShortLink = ()=>{
  const classes = useStyles();
  const [ram, setRam] = useState('');
  const [customRam, setCustomRam] = useState('');
  const [qrChecked, setQrChecked] = useState(false);
  const [color, setColor] = useState('#000');
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState('');
  const [open, setOpen] = React.useState(false);
const [responseLinkMessage,setResponseLinkMessage]= React.useState('')
  const { _id, username } = isAuthenticated().user;
  const { token } = isAuthenticated();

  const handleRamChange = (event) => {
    setRam(event.target.value);
  };

  const handleCustomRamChange = (event) => {
    setCustomRam(event.target.value);
  };

  const handleQrChecked = (event) => {
    setQrChecked(event.target.checked);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
      setLogo(file);
      setLogoError('');
    } else {
      setLogo(null);
      setLogoError('Please select a PNG file');
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form submitted:', { ram, customRam, qrChecked, color, logo });
    const url = `${BACKEND_BASE_URL}/url/shorten/${_id}`
    const data = {
      originalUrl:ram,
      customUrl:customRam?customRam:'',
      qr:qrChecked?1:0,
      color:color,
      centerImage:logo

    }
    let config = {
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:data,
    }
    await axios(url,config).then((res)=>{
      console.log(res);
      setOpen(true);
      setResponseLinkMessage("Your URL has been shortened and is ready to use.")
    }).catch((err)=>{
      setOpen(true)
      setResponseLinkMessage("Custome URL already exists , please try with another one")
    })
    setRam('');
     setCustomRam('');
    // qrChecked('');
    // setColor('');
    // setLogo('');
    

  };

  return (
    <>
    <Menu></Menu>
    <Container maxWidth="sm" className={classes.container}>
      <div className={classes.formContainer}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              id="ram"
              label="Original URL"
              value={ram}
              onChange={handleRamChange}
            />
            <TextField
             
             
             id="customRam"
             label="Custom URL"
             value={customRam}
             onChange={handleCustomRamChange}
           />
         </div>
         <div>
           <FormControlLabel
             control={
               <Checkbox
                 checked={qrChecked}
                 onChange={handleQrChecked}
                 name="qrChecked"
                 color="primary"
               />
             }
             label="Include QR Code"
           />
         </div>
         <div className={classes.colorPickerContainer}>
           <ChromePicker color={color} onChange={handleColorChange} />
         </div>
         <div className={classes.logoInputLabel}>
           <input
             className={classes.logoInput}
             id="logo"
             type="file"
             accept=".png"
             onChange={handleLogoChange}
           />
           <label htmlFor="logo">Upload Logo (PNG only)</label>
           {logo && (
             <img className={classes.logoPreview} src={URL.createObjectURL(logo)} alt="Logo Preview" />
           )}
           {logoError && <div className={classes.logoError}>{logoError}</div>}
         </div>
         <Button variant="contained" color="primary" type="submit" className={classes.button}>
           Submit
         </Button>
       </form>
     </div>

     <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>URL shortened successfully</DialogTitle>
  <DialogContent>
    <DialogContentText>
      {responseLinkMessage}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>

   </Container>
   </>

   );
  

}



export default ShortLink;