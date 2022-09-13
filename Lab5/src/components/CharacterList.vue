<template>
  <div v-if="this.charactersList.length != 0">
    <router-link v-if="parseInt(this.$route.params.page)!=0" :to="{name: 'characterList', params: {page: parseInt(this.$route.params.page)-1}}">Prev</router-link>
    <br />
   <router-link :to="{name: 'characterList', params: {page: parseInt(this.$route.params.page)+1}}">Next</router-link>
  
     <br />

    <ul>
      <li v-for="(character,index) in charactersList" :key="index">
        <router-link :to="{name: 'characters', params: {id: character.id}}">{{character.name}}</router-link>
      </li>
    </ul>
  </div>
  <div v-else> 404 Error </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CharacterList",
  data() {
    return {
      charactersList: []
    };
  },
  created() {
    const md5 = require('blueimp-md5');
     const publickey = 'bd892fe7a91b68fe137516545a8cd748';
            const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
            const url = baseUrl + '?ts=' + ts + '&limit=25&offset='+ this.$route.params.page*25 +'&apikey=' + publickey + '&hash=' + hash;
            console.log(this.$route.params.page);
    axios
      .get(url)
      .then(({ data }) => (this.charactersList = data.data.results));
      console.log(this.charactersList);
  },
  watch: {
    $route() {
    
      const md5 = require('blueimp-md5');
     const publickey = 'bd892fe7a91b68fe137516545a8cd748';
            const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
            const url = baseUrl + '?ts=' + ts + '&limit=25&offset='+ this.$route.params.page*25 +'&apikey=' + publickey + '&hash=' + hash;
            console.log(this.$route.params.page);
    axios
      .get(url)
      .then(({ data }) => (this.charactersList = data.data.results));
      console.log(this.charactersList);
    }
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}
</style>