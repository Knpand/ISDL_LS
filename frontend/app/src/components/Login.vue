<template>
    <div id="login">
  
    <form v-on:submit.prevent="doLogin">
        <label>User ID</label>
        <input type="text" v-model="id" />
        <label>Password</label>
        <input type="password" v-model="password"  />
        <button type="submit">Sign In</button>
    </form>
    </div>
</template>
<script>
//import axios from 'axios';

//const uri = "http://localhost:8080/logincheck";

export default {
    name:'Login',
         data(){
    return {
        id:'',
      password:'',
      student_name:'',
      myresponse:''
    };
  },
 
  methods: {

      
 
getresponse() {

          return this.id
},


  //ログインボタン
  //get_responseからresponseを抜き取れない
    doLogin() {
     
    console.log(this.getresponse())
    this.$store.dispatch("auth", {userId: this.getresponse(),userToken: 'dummy token'});     
    console.log(this.$store.state.userId )
     
      this.$router.push('home');
    }
  }
  
};
</script>