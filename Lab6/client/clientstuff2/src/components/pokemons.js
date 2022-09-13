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

const Pokemons = (props) => {
    const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let {id} = useParams();

  useEffect(() => {
        console.log('useEffect fired');
        async function fetchData() {
        // const publickey = 'bd892fe7a91b68fe137516545a8cd748';
        // const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
        // const ts = new Date().getTime();
        // const stringToHash = ts + privatekey + publickey;
        // const hash = md5(stringToHash);
        // const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+id;
        console.log(id);
        const url = "/pokemon/"+id
        try {
            const {data} = await axios.get(url);
            console.log(data);

            setPokemonData(data);
        
            setLoading(false);
       // console.log(show);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  
  const regex = /(<([^>]+)>)/gi;
  /*if (characterData && characterData.description) {
    summary = characterData && characterData.description.replace(regex, '');
  } else {
    summary = 'No Summary';
  }*/

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <Card className={classes.card} variant='outlined'>
        <CardHeader className={classes.titleHead} title={pokemonData.name} />
        <CardMedia
          className={classes.media}
          component='img'
          image={
           pokemonData.image
          }
          title='show image'
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='span'>
          <dl>
              <p>
                <dt className='title'>Name</dt>
                  <dd>{pokemonData.name}</dd>
               
               
              </p>
            </dl>
            <dl>
              <p>
                <dt className='title'>Types</dt>
                <dd>{pokemonData.type[0].type.name}</dd>
              </p>
              <button>ADD</button>
            </dl>
            <Link to='/pokemon/page/1'>Back to the Pokemon list</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Pokemons;