import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../constant';
const SignInWithGoogle = () => {
  const history = useHistory();



  return (
    <Grid container justifyContent="center">
      <a href="http://localhost:5000/oauth/google">
      <Button variant="contained" color="primary">
        Sign In With Google
      </Button>
      </a>

    </Grid>
  );
};

export default SignInWithGoogle;
