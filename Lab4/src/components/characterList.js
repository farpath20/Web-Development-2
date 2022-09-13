import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles
  } from '@material-ui/core';
  
  import '../App.css';
const md5 = require('blueimp-md5');

  const useStyles = makeStyles({
    card: {
      maxWidth: 250,
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
//import SearchShows from './SearchShows';
const CharacterList = (props) => {
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    //const [searchData, setSearchData] = useState(undefined);
    const [characterData, setCharacterData] = useState(undefined);
    //const [searchTerm, setSearchTerm] = useState('');
    const prevDis  =useRef(false);
    const nextDis  =useRef(false);
    let card = null;
    async function next(){
        let pgNum = parseInt(props.match.params.pagenum)+1;
        props.history.replace({ pathname: `/characters/page/${pgNum}`})
      
      }
    async function previ() {
      
        let pgNum = parseInt(props.match.params.pagenum)-1;
        props.history.replace({ pathname: `/characters/page/${pgNum}`})
        
      }
    useEffect(()=>{

    
        async function getCharacters()
        {
            
            let pgNum = parseInt(props.match.params.pagenum);
            if(pgNum === 0) {
                prevDis.current = true;
      
              }
              else{
                prevDis.current = false;
              }
              if(pgNum ===62)
              {
                nextDis.current = true;
              }
              else
              {
                nextDis.current = false;
              }
            const publickey = 'bd892fe7a91b68fe137516545a8cd748';
            const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
            const url = baseUrl + '?ts=' + ts + '&limit=25&offset='+ pgNum*25 +'&apikey=' + publickey + '&hash=' + hash;
            try{
                const {data} = await axios.get(url);
                setCharacterData(data.data.results);
                setLoading(false);
            }
            catch(e)
            {
                console.log("Error in the axios call for character list")

            }

        }
        getCharacters();
},  [props.match.params.pagenum]);

    //////////////////////////////////massive edit
    const buildCard = (show) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
            <Card className={classes.card} variant='outlined'>
              <CardActionArea>
                <Link to={`/characters/${show.id}`}>
                  <CardMedia
                    className={classes.media}
                    component='img'
                    image={
    
                      show.thumbnail.path+"/portrait_medium."+show.thumbnail.extension
                      
                    }
                    title='show image'
                  />
    
                  <CardContent>
                    <Typography
                      className={classes.titleHead}
                      gutterBottom
                      variant='h6'
                      component='h3'
                    >
                      {show.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      {show.description
                        ? show.description.replace(regex, '').substring(0, 139) + '...'
                        : 'No Summary'}
                      <span>More Info</span>
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        );
      };
    
     
        card =
          characterData &&
          characterData.map((show) => {
            return buildCard(show);
          });
      
    
      if (loading) {
        return (
          <div>
            <h2>Loading....</h2>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <button onClick={next} disabled={nextDis.current}>Next</button>
            <br />
            <button onClick={previ} disabled={prevDis.current}>Prev</button>
            <br />
            <br />
            <Grid container className={classes.grid} spacing={5}>
              {card}
            </Grid>
          </div>
        );
      }
    };
    export default CharacterList;
