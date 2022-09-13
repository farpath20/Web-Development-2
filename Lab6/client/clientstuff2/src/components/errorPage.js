import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
//import noImage from '../img/download.jpeg';
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@material-ui/core';
import '../App.css';
const md5 = require('blueimp-md5');
const useStyles = makeStyles({
  card: {
    maxWidth: 550,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #1e8678',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #1e8678',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#1e8678',
    fontWeight: 'bold',
    fontSize: 12
  }
});

const ErrorPage = (props) => {
    const classes = useStyles();
   

    return (
      <Card className={classes.card} variant='outlined'>
        <CardHeader className={classes.titleHead} title= "Error" />
        
        <CardContent>
            
          <Typography variant='body2' color='textSecondary' component='span'>
            <Link to='/'>Back Home</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  };

export default ErrorPage;