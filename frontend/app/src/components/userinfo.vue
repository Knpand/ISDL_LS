
<template>
  <div class="app-container">

<modal name="hello-world" :draggable="true" :resizable="true">
    <div class="modal-header">
      <h2>ユーザ情報変更</h2>
    </div>
    <div class="modal-body">
    <div class="changename" style="float:left">
      <p class="change_p">名前：</p>
      <b-form-input v-model="new_username" ></b-form-input>
    </div>
    <div class="changemail" style="float:left">
      <p class="change_p">Email：</p>
      <b-form-input v-model="new_email" ></b-form-input>
    </div>
    <div class="footbtn">
      <b-button variant="primary" class="chengebtn" v-on:click="to_check_password">更新</b-button>
      <b-button variant="secondary" v-on:click="back_main" class="chengebtn">閉じる</b-button>
    </div>  
    </div>
  </modal>

<modal name="check_password" :draggable="true" :resizable="true">
    <div class="modal-header">
      <h2>パスワード</h2>
    </div>
    <div class="modal-body">
    <div class="changename" style="float:left">
      <p class="change_p">パスワードを入力してください</p>
      <b-form-input type="password" v-model="password" ></b-form-input>
    </div>
    
    <div class="footbtn">
      <b-button variant="primary" class="chengebtn" v-on:click="update_user">確認</b-button>
      <b-button variant="secondary" v-on:click="back_infomodal" class="chengebtn">戻る</b-button>
    </div>  
    </div>
  </modal>

  <div class="info-box">
      <div class="title">
        <h3 class="pagetitle">ユーザ情報</h3>
      </div>

  <div class="user_info" style="float:left">
    <table class="tstyle">
      <tbody>
        <tr>
          <th class= "us_name t-left">
            氏名
          </th>
          <td class="us_name w-break">
            {{username}}
          </td>
          <th class= "us_dptid t-left">
            Email
          </th>
          <td class= "us_dptid w-break">
            {{email}}
          </td>
        </tr>
      </tbody>
    </table>

    <button class="optionbtn"  v-on:click="show" >
      <img src="../image/option.png" alt="送信" />
    </button>
  </div>
    <div class="panel">
      <div>
        <b-card no-body>
          <b-tabs card>
      <b-tab title="貸出中" active>
        <!-- <b-card-text>Tab contents 1</b-card-text> -->
        <b-card-body >
            <b-card-title>貸出中</b-card-title>
            <b-card-text>

              <table class="user_rental">
					<thead>
						<tr>
							<th>タイトル</th>
							<th>著者</th>
							<th>出版社</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(book, index) in books_rental" :key="index">
							<td>{{ book.title }}</td>
							<td>{{ book.author }}</td>
							<td>{{ book.publisher }}</td>
						</tr>
					</tbody>
				</table>

           
            </b-card-text>

          </b-card-body>



      </b-tab>
      <b-tab title="貸出履歴">
        <!-- <b-card-text>Tab contents 2</b-card-text> -->
        <b-card-body >
            <b-card-title>貸出履歴</b-card-title>
            <b-card-text>

              <table class="user_rental">
					<thead>
						<tr>
							<th>タイトル</th>
							<th>著者</th>
							<th>出版社</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(book, index) in books_history" :key="index">
							<td>{{ book.title }}</td>
							<td>{{ book.author }}</td>
							<td>{{ book.publisher }}</td>
						</tr>
					</tbody>
				</table>

           
            </b-card-text>

          </b-card-body>
      </b-tab>
    </b-tabs>
        </b-card>
      </div>
    </div>

  
  
  </div>
    
  </div>
</template>

<script>
import firebase from "../firebase.js";
import axios from 'axios'
const URL = 'http://127.0.0.1:5000/'

export default {
    name: 'userinfo',
  data() {
    return {
        new_username:"",
        username:"",
        new_email:"",
        email:"",
        password:"",
        books_rental:[
        ],
        books_history:[
        ]

        
    }
  },
  created(){
      this.fetchData();
      this.new_username=this.username
      this.new_email=this.email
      console.log(this.$store.state.userID)
      var params = new FormData()
      params.append('user_id', this.$store.state.userID)
    axios.post(`${URL}user_info`, params)
    .then(response => {
			// 通信が成功しているかの確認
			// alert(response.status)
			// flaskにPOST後に返ってくるデータの確認
      // his_booksとren_books確認する必要あり
      
			console.log(response.data)
      


		
      var rental_books=response.data['ren_books']
      var history_books=response.data['his_books']
      console.log(response.data)
      console.log(rental_books)
			for(var i in rental_books){
				this.getData = {
					title:rental_books[i].title,
					author:rental_books[i].author,
					publisher:rental_books[i].publisher,
					state: rental_books[i].rental_username
				}
				this.books_rental.push(this.getData)
				// console.log(this.tableData)
			}

      for( i in history_books){
				this.getData = {
					title:history_books[i].title,
					author:history_books[i].author,
					publisher:history_books[i].publisher,
					state: history_books[i].rental_username
				}
				this.books_history.push(this.getData)
				// console.log(this.tableData)
			}
		})
		.catch(error => {
			alert('データを送信できませんでした．')
			alert(error)
		})
  },
  methods:{
     show : function() {
      this.$modal.show('hello-world');
    },
    hide : function () {
      this.$modal.hide('hello-world');
    },
    update_user:function(){
    
         const user=firebase.auth().currentUser;
         const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.password
          );
          
        

    user.reauthenticateWithCredential(credential).then(() => {
        // 再認証に成功した場合のみ、updatePasswordメソッドを実行する
        user.updateProfile({
            displayName: this.new_username
           })
            .then(()=> {
                console.log('Update name successful')
            
            

            }).catch((error)=> {
                console.log(error)
              });

        user.updateEmail(this.new_email).then(() => {
          var params = new FormData()
            params.append('user_id', this.$store.state.userID)
            params.append('name', this.new_username)
            params.append('email', this.new_email)
            axios.post(`${URL}upuser`, params)
            .then(response => {
              console.log(response)
              this.$store.dispatch("auth",{userID:this.$store.state.userID,username:this.new_username,userToken:'dummy Token'})
            })
            .catch(error => {
                alert('データを送信できませんでした．')
                console.log(error)
            })
          console.log('update email')
        }).catch((error) => {
          console.log(error)
        })
        this.username=this.new_username;
      // reauthenticateWithCredentialに失敗したケース
      }).catch((error) => {
        console.log(error)
        alert("パスワードが正しくありません");
      });
  
   
      this.email=this.new_email;
      console.log(firebase.auth().currentUser.displayName)

      this.$modal.hide('check_password');


    },
    fetchData:function(){
      this.username=firebase.auth().currentUser.displayName;
      this.email=firebase.auth().currentUser.email;
    },
    back_infomodal:function(){
      this.$modal.hide('check_password');
      this.$modal.show('hello-world');
    },
    to_check_password:function(){
      this.$modal.hide('hello-world');
      this.$modal.show('check_password');
    },
    back_main:function(){
      this.$modal.hide('hello-world')
      this.new_username=this.username;
      this.new_email=this.email;
    }
  },
  computed: {
 
  

  }
}
</script>

<style>
.user_rental{
  position:relative;
}
.user_info{
  position:relative;
}
.changebtn{
  position:relative;
  margin-top:30px;
  margin-right:5px;
  margin-left:5px;
}
.footbtn{
  text-align:right;
}
.change_p{
  margin-bottom:0;
}
.optionbtn{
  position:relative;
  left:98%;
  width: auto;
    padding:0;
    margin:0;
    background:none;
    border:0;
    font-size:0;
    line-height:0;
    overflow:visible;
    cursor:pointer;
}
.cardbody{
  border: 1px solid;
}
.info-box{
  width:97%;
  margin-left:auto;
  margin-right:auto;
}

.pagetitle {
    border-color: #3373d3;
    border-bottom: solid 2px #1f4e78;
    padding: 15px 2px 2px 1.1em;
    text-indent: -0.8em;
    font-weight: bold;
}
.t-left{
    background-color: #f2f2f2;
    padding-left: 1em;
    padding-right: 1em;
    white-space: nowrap;
    background-color:#f2f2f2;
    border: 1px solid #cccccc;
    width:10%;
}
.w-break{
  padding-left: 1em;
  padding-right: 1em;
  width: 20%;
  border: 1px solid #cccccc;
}
.tleft.w-break{
  padding: 5px;
  border: 1px solid #cccccc;
  
}
.tstyle {
    width: 90%;
    float: left;
}

.wrap {
  display: flex;
  text-align: center;
  height:600px;

}

.left{
  flex:1;
}

.right{
  flex:1;
}

.panel {
    margin-bottom: 20px;
    margin-top:90px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

.line{
  width:96%;
  border-width: 3px;
  border-color: #3373d3;
}

.line2 {
  margin: 0 1rem;
  width: 4px;
  background-color: #808080;
}

</style>









