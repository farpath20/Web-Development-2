<template>
  <div>
    <h1>{{this.name}}</h1>
    <br />
    <img v-if="this.image" :src="this.image" />
    <br />
    <span v-html="this.description"></span>
    <br />
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "Character",
  data() {
    return {
      id: this.$route.params.id,
      image:null,
      name: null,
      description: null
    };
  },
  methods: {
    getShow() {
      const md5 = require('blueimp-md5');
      const publickey = 'bd892fe7a91b68fe137516545a8cd748';
        const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+this.$route.params.id;
        const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
      axios
        .get(url)
        .then(({ data }) => {
          // this.characters = data.data.result;
          this.image =  data.data.results[0].thumbnail.path+"/portrait_medium."+data.data.results[0].thumbnail.extension;
          this.name = data.data.results[0].name;
          this.description = data.data.results[0].description;
        });
        console.log(this.characters);
        
    }
  },
  created() {
    this.getShow(this.$route.params.id);
  },
  watch: {
    $route() {
      const md5 = require('blueimp-md5');
      const publickey = 'bd892fe7a91b68fe137516545a8cd748';
        const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+this.$route.params.id;
        const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
      axios
        .get(url)
        .then(({ data }) => (this.characters = data.data.result));
        this.characters.image =  this.characters.thumbnail.path+"/portrait_medium."+this.characters.thumbnail.extension
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
span {
  text-align: center;
  max-width: 50%;
}
div {
  max-width: 50%;
  margin: 0 auto;
}
</style>