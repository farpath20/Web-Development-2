const express = require('express');
const router = express.Router();
//const data = require('../data');
//const personData =  data.Persondata;
const bluebird = require('bluebird');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
/*router.get('/',async(req,res,next)=> {

})*/

async function getPeople(){
    const  {data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/ed50954f42c3e620f7c294cf9fe772e8/raw/925e36aa8e3d60fef4b3a9d8a16bae503fe7dd82/lab2")
    return data // this will be the array of people objects}
}
async function getById(id) {
  let people = await getPeople();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        let hasProject=false;
        let person;
        for(i of people)
        {
            if(i.id==id)
            {
                hasProject= true;
                person =i;

            }
        }


        if (hasProject) {
            resolve(person);
        } else {
            reject(new Error("something went wrong"));
        }}, 5000);
      });

}
router.get('/people/history', async (req, res) => {
let items = (await client.lrangeAsync("Visitors",0,19).map(JSON.parse))
res.status(200).json(items);
})
router.get('/people/:id', async (req, res) => {
  
  
  console.log(req.params.id)
  let personExist;
  
    personExist = await client.getAsync("person");
    let personArray =  personExist.split("");
    let adder = 0;
  for(i of personArray)
  {
    if(i==',')
    {
      break;
    }
    adder++;
  }
  let index = personExist.substring(6,adder);
  if (index==req.params.id)
  {
    return res.status(200).json(JSON.parse(personExist));
  }
  else{
    let person
    try{
       person = await getById(req.params.id);
    }
    catch(e)
    {
      return res.status(400).json({error:"Error: Person not found."})
    }
    
    let newPerson = await client.setAsync(
        'person',
        JSON.stringify(person)
      );
    await client.lpushAsync("Visitors",JSON.stringify(person));
    return res.status(200).json(person);
  }
  
  


})
module.exports = router; 