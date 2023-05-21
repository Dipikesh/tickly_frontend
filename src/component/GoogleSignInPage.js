import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useHistory ,useLocation} from 'react-router-dom';
import { BACKEND_BASE_URL } from '../constant';
import { userLogin, authenticate } from '../auth'



const GoogleSignInPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const username = params.get('username');
    const email = params.get('email');
    const token = params.get('token');
    const history = useHistory();
    
  const data = {
    token:token,
    user:{
        _id:id,
        username,
        email
    }

  }
    authenticate(data)
    history.push('/dashboard')
   
  return (
    <b>asdf</b>
  );
};

export default GoogleSignInPage;
