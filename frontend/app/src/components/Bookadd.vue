<template>
    <div id="container">
        <div class="rental">
                        <h1>書籍登録</h1>
                        <!-- スキャン -->
                        <div class="sendform">
                            <b-form-input class="sendinput sendelement" type="text" v-model="isbn_rental" @change="addbook" placeholder="スキャンしてください" style="margin-bottom: 5px; height:50px;width:86%;"/>
                            <b-button variant="secondary" class="btn sendelement btn-default sendbtn" v-on:click="sendbook" style="padding: 0.7rem 1.0rem;margin-left:5px;height:50px;width:100px">送信</b-button>
                        </div>
                        <!-- テーブル -->
                            <table>
                            <thead>
                                <tr>
                                    <th>タイトル</th>
                                    <th>著者</th>
                                    <th>出版社</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(book, index) in rentalbooks" :key="index">
                                    <td>{{ book.title }}</td>
                                    <td>{{ book.author }}</td>
                                    <td>{{ book.publisher }}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
    </div>
</template>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script>
import axios from 'axios'
const URL = 'http://127.0.0.1:5000/'

export default {
	name: 'Home',
		data() {
			return {
			checked:false,
			isbn_rental:"",
			isbn_return:"",
			rentalbooks:[],
			returnbooks:[],
			rentalisbn:[],
			returnisbn:[],
			sendisbn:[],
			bookinfo:[{
				title:"aaa",
				author:"bbb",
				publisher:"ccc",
				state:'貸出中',
				isbn:1
			}
			],
			getData:[],
			tableData: [],

			isbn:'',
			keyword:'',
		}
	},

	methods: {
		addbook: function () {
            var params = new FormData()
			params.append('isbn', this.isbn_rental)
            console.log("aaa")
            var title
            var author
            var publisher
            axios.post(`${URL}ra_book`, params)
            .then(response => {
                title=response.data.title
                author=response.data.author
                publisher=response.data.publisher
                console.log(response.data)
                this.rentalbooks.push({
                title: title,
                author: author,
                publisher: publisher
            })
            })
			.catch(error => {
				alert('データを送信できませんでした．')
				alert(error)
			})
            
            this.sendisbn.push(this.isbn_rental);

            this.isbn_rental='';
				// this.tableData.push(this.getData)
				// console.log(this.tableData)	
			},
		
		



		sendbook:function(){
			/*サーバにsendisbnをおくる*/
			var params = new FormData()
			params.append('isbn', this.sendisbn)
            console.log(this.sendisbn)
			this.sendisbn = []
			console.log(params)
           
			axios.post(`${URL}addbook`, params)
			.then(response => {
				console.log(response.data)
			
			})
			.catch(error => {
				alert('データを送信できませんでした．')
				alert(error)
			})
			this.rentalbooks.splice(0)
		},


    },

	computed: {	
	}
}
</script>
