<template>
  <div class="app-container">
  


    <div class="search_bar lend">
      <i class="fas fa-search search_icon"></i>
      <input type="text" id="searchtext" placeholder="キーワードを入力" v-model="keyword">
    </div>
    <div class="lend">
      貸出可能のみ表示
      <input type="checkbox" id="checkbox" v-model="checked" name="checkbox01" >
    </div>
    <table class="tb01">
      <thead>
            <tr>
              <th>タイトル</th>
              <th>貸出状況</th>
            </tr>
      </thead>
          <tbody>
            <tr v-for="tableData in filteredbooks" :key="tableData.name">
              <td v-text="tableData.bookname"></td>
              <td v-text="tableData.state"></td>
            </tr>
          </tbody>
    </table>
  </div>
</template>
<script>
//import axios from 'axios';
//const URL = 'http://127.0.0.1:5000/';

export default {
    name: 'bookserch',
  data() {
    return {
        checked:false,
        keyword:'',
        tableData: [{
				bookname: 'ゼロからディープラーニング',
				state:'貸出中'
				}, 
				{
				bookname: 'ゼロから機械学習',
				state:'貸出可能'
				}, 
				{
				bookname: 'mouse of mickey',
				state:'貸出可能'
				}, 
				{
				bookname: '三角形が180度を超える日が来た',
				state:'貸出可能'
				},{
				bookname: 'ゼロからディープラーニング',
				state:'貸出中'
				}, 
				{
				bookname: 'ゼロから機械学習',
				state:'貸出可能'
				}, 
				{
				bookname: 'mouse of mickey',
				state:'貸出可能'
				}, 
				{
				bookname: '三角形が180度を超える日が来た',
				state:'貸出可能'
				},{
				bookname: 'ゼロからディープラーニング',
				state:'貸出中'
				}, 
				{
				bookname: 'ゼロから機械学習',
				state:'貸出可能'
				}, 
				{
				bookname: 'mouse of mickey',
				state:'貸出可能'
				}, 
				{
				bookname: '三角形が180度を超える日が来た',
				state:'貸出可能'
				}]
    }
  },
  
  created(){
    this.conlog()
    //path=this.$route.path

    /*
    axios.post('${URL}/book,"")
    .then(response => {
        // 通信が成功しているかの確認
        // alert(response.status)
        // flaskにPOST後に返ってくるデータの確認
        this.results = response.data
        // alert(JSON.stringify(response.data.isbns))
      }
      */
      
  },
  methods:{
    conlog(){
      console.log(this.$route.path)
    }
  },
  computed: {
            filteredbooks: function() {

                var tableData = [];
                var books=[];
                var book;
                for(var j in this.tableData){
                  book=this.tableData[j];
                  if(this.checked==true){
                    if(book.state=='貸出可能'){
                      books.push(book);
                    }
                  }
                  else{
                    books.push(book);
                  }
                }
                for(var i in books) {

                    book = books[i];

                    if(book.bookname.indexOf(this.keyword) !== -1 ) {

                        tableData.push(book);

                    }

                }
                console.log(tableData)
                return tableData

            },
           



  }
}
</script>

<style>
/* search_area */
.searcharea{
  float:left;
}
.search_bar{
    display: flex; /*アイコン、テキストボックスを調整する*/
    align-items: center; /*アイコン、テキストボックスを縦方向の中心に*/
    justify-content: center; /*アイコン、テキストボックスを横方向の中心に*/
    height: 50px;
    width: 100%;
    background-color: #ddd;
   
}
.lend{
  float:left;
}
.search_icon{ /*アイコンに一定のスペースを設ける*/
    height: 15px;
    width: 15px;
    padding: 5px 5px;
}
#searchtext{
    font-size: 16px;
    width: 100%; /*flexの中で100%広げる*/
    background-color: #ddd;
    border: none; /*枠線非表示*/
    outline: none; /*フォーカス時の枠線非表示*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
/* table_area */
table.tb01 {
  top: 130px;
  width: 100%;
}
table.tb01 thead {
  display: block;
}
table.tb01 thead th:first-of-type{
    width: 45%;
}
table.tb01 thead th:nth-of-type(2){
    width: 20%;
}
table.tb01 thead th:nth-of-type(3){
    width: 20%;
}
table.tb01 thead th:nth-of-type(4){
    width: 200px;
}
/* tbody */
table.tb01 tbody {
  display: block;
  height: 570px;
  
}
table.tb01 tbody td:first-of-type{
  width: 45%;
}
table.tb01 tbody td:nth-of-type(2){
  width: 20%;
}
table.tb01 tbody td:nth-of-type(3){
  width: 20%;
}
table.tb01 tbody td:nth-of-type(4){
  width: 200px;
}
.checkbox01::before {
    background: #fff;
    border: 1px solid #231815;
    content: '';
    display: block;
    height: 16px;
    left: 5px;
    margin-top: -8px;
    position: absolute;
    top: 50%;
    width: 16px;
}
.checkbox01::after {
    border-right: 3px solid #ed7a9c;
    border-bottom: 3px solid #ed7a9c;
    content: '';
    display: block;
    height: 9px;
    left: 10px;
    margin-top: -7px;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: rotate(45deg);
    width: 5px;
}
</style>
