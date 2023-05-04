import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import Menu from '../core/Menu';


import { Container, TextField, Checkbox, FormControlLabel, Select, MenuItem, Button } from '@material-ui/core';


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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { ram, customRam, qrChecked, color, logo });
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
              label="RAM"
              value={ram}
              onChange={handleRamChange}
            />
            <TextField
             
             required
             id="customRam"
             label="Custom RAM"
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
   </Container>
   </>

   );
  

}



export default ShortLink;