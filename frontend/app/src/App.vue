<template>
  <div id="app">
    <header>
    <div class="loginname_block">
      <div class="hellouser">
      ようこそ {{this.$store.state.username }} さん
      </div>
    </div>
      <div class="title">
        <h1 style="margin-left:10px;margin-top:5px;">書籍管理システム</h1>
      </div>
      
    </header>
     <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
      <!--<b-navbar-brand>サイト全体のロゴを表示するコンポーネント-->
        <!--<b-navbar-brand href="#">NavBar</b-navbar-brand>-->

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!--<b-navbar-nav>ヘッダーのどこに配置するかを決めるためのコンポーネント-->

          <b-navbar-nav>
            <!--<b-navbar-item> <b-navbar-nav>が子要素として持てるタグの１つ-->
            <b-nav-item to="/home">ホーム</b-nav-item>
            <b-nav-item to="/userinfo" >ユーザ管理</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
   
            <b-button variant="dark" v-on:click="logout" right>ログアウト</b-button>
           

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

   
  
    <div class="scafold-wrapper box2">
      <router-view/>
    </div>
  <!-- <bottom class="footer-area"></bottom> -->

  </div>
  

</template>

<script>
//import Sidebar from './components/sidebar.vue'
import firebase from "./firebase.js";





export default {
  name: 'App',
   data() {
    return {
        hello_user:"ゲスト",
      
    }
  },
  components:{
   // headercomp
    //Sidebar
  },
  methods:{
     logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
        this.$store.dispatch("auth", {userID:"",username:"ゲスト",userToken: 'dummy token'});
      })
    },
    
  }
};



</script>
<style>

.loginname_block{
  background-color: #c5dcf0;
  /* padding: 3px; */
  text-align: right;
  height:25px;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  
}
body {
  margin: 0;
  background-color: #eee;
}
header{
  position:relative;
}

.hellouser{
position: absolute;
padding-right: 10px;
padding-bottom: 5px;
bottom: 0;
}

.box2{
  position:absolute;
  width:100%
}
.footer-area {
  margin-top: 40px;
}
.title{
  padding:5px;
}


</style>
