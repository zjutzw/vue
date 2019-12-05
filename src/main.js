import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var zwhead = {
	data:function(){
		return {show:false}
	},
	computed: {
		data: function() {
			return this.$root.data;
		},
		paniernum: function() {
			return this.$root.num;
		},
		scroll:function(){
			return this.$root.scroll;
		}

	},
	created:function(){
		window.onscroll=function(){
			console.log(app.scroll);
			app.scroll=document.body.scrollTop+document.documentElement.scrollTop;
		}
	},
	watch: {
	    scroll: function () {
		    if (this.scroll>200){
		    	this.show=true
		    }else{
		    	this.show=false;
		    }
    }
  },
	template: `
	<div class='container'>
		
			<div v-show="!show" class='zw-nav row navbarup'>
				<nav class="navbar fixed-top" >
				  	<div class="zw-nav-brand"  data-toggle="modal" data-target="#exampleModal" >SUSHI</div>
				  	<router-link class="zw-nav-panier" to="/panier"><i class="material-icons">shopping_cart</i><div class='total'>{{paniernum.total}}</div> <a class='totalprix'>{{paniernum.totalprix.toFixed(2)}}€</a></router-link> 
				</nav>
			</div>
			<div v-show="show" class='zw-nav row navbardown' >
				<nav class="navbar fixed-top navbar-dark bg-dark slide-bar" >
				  	<div class="zw-nav-brand" data-toggle="modal" data-target="#exampleModal">SUSHI</div>
				  	<router-link class="zw-nav-panier" to="/panier"><i class="material-icons">shopping_cart</i><div class='total'>{{paniernum.total}}</div> <a class='totalprix'>{{paniernum.totalprix.toFixed(2)}}€</a></router-link> 
				</nav>
			</div>
			<div class="modal fade menufond" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div class="modal-dialog" role="document">
			    	<div class="modal-content">
				      	<div class="modal-body">
				        	<div><router-link class="navbar-brand" to="/" data-dismiss="modal">accueil</router-link></div>
				        	<div><router-link class="navbar-brand" to="/panier" data-dismiss="modal">panier</router-link></div>
				      	</div>

			      		<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			      	</div>
 
			    
			  	</div>
			</div>
			
		
	</div>
  	
	`
}

var zwfoot = {
	template: `
  	<div>
		<nav class="navbar navbar-dark bg-dark">
		  	<router-link class="navbar-brand" to="/">sushi</router-link>
		</nav>
	</div>
	`
};
var index = {
	computed:{
		foodlists: function() {
			return this.$root.foodlists;
		},
		paniernum: function() {
			return this.$root.num;
		},
	},

	created(){
		axios.get('/data').then(response => (app.foodlists = response.data));
	},
	
	template: `
		<div>
			<zw-head></zw-head>
			<div id="carouselExampleIndicators" class="carousel slide" height='300px;' data-ride="carousel">
			  <ol class="carousel-indicators">
			    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
			    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
			    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
			  </ol>
			  <div class="carousel-inner">
			    <div class="carousel-item active">
			      <div class="d-block w-100 slide" alt="...">
			      	<div class='slide1'></div>
			      </div>
			    </div>
			    <div class="carousel-item">
			      <div class="d-block w-100 slide" alt="...">
			      	<div class='slide2'></div>
			      </div>
			    </div>
			    <div class="carousel-item">
			      <div class="d-block w-100 slide" alt="...">
			      	<div class='slide3'></div>
			      </div>
			    </div>
			  </div>
			  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
			<div v-for='food in foodlists'>
				<foodbox :food='food'></foodbox>
			</div>
			<zw-foot></zw-foot>
		</div>
	`,
	

}
var foodbox= {
	props: ['food'],
	computed:{
		data:function() {
			return this.$root.panierlists;
		},
		num:function() {
			return this.$root.num;
		},
	},
	template: `
		<div class='container'>
			
			<div class='row align-items-center'>
										<div class='col-4'>
									  		<img :src="food.imgurl" class="foodboximg mx-auto img-thumbnail d-block"  alt="...">
								  		</div>
									  	<div class='col-6 '>
										  	<h3>{{food.name}}</h3>
										  	
										  	<p>{{food.detail}}</p>
									  
									    	
									  	</div>
									  	<div class='col-2'>
									  		<h5>{{food.prix}}€</h5>
									  		
									  		<button class='btn btn-primary btn-sm' v-on:click='add()'><i class="material-icons">add</i></button>
									  		{{num[food.id]}}
									  		<button class='btn btn-primary btn-sm' v-on:click='remove()'><i class="material-icons">remove</i></button>
								  		</div>
									</div>
		</div>
	`,
	methods:{
		add:function(){
			this.num.total+=1;
			this.num.totalprix+=this.food.prix;
			for(list in this.data.list){ 
				if (this.food.id==this.data.list[list].id){
					this.num[this.food.id]+=1;
					return;
				}
			}
			this.num[this.food.id]=1;
			
			this.data.list.push(this.food);
		},
		remove:function(){
			for(list in this.data.list){ 
				if(this.food.id==this.data.list[list].id){
					this.num[this.food.id]-=1;
					this.num.total-=1;
					this.num.totalprix-=this.food.prix;	
					if(this.num[this.food.id]<=0){
						console.log('已经删除完');
						console.log(this.data.list.indexOf(this.data.list[list]));
						var deletelist=this.data.list.splice(this.data.list.indexOf(this.data.list[list]),1);
						this.num[this.food.id]=0;
					}
				}
			}
		}

	},

}
var panier = {
	
	computed:{
		data:function() {
			return this.$root.panierlists;
		},
	},
	

	template: `
		<div>
			<zw-head></zw-head>
			<div  class="zw-img-menu" alt="Responsive image"></div>
			<panierlists></panierlists>
			
			<zw-foot></zw-foot>
		</div>
		`
}

var panierlists = {
	
	computed:{
		data:function() {
			return this.$root.panierlists;
		},
		num:function() {
			return this.$root.num;
		},
	},
	methods:{
		deletelist:function(index){
			console.log(index);
			var deletelist=this.data.list.splice(index,1);
			this.num.totalprix-=(this.num[deletelist[0].id].toFixed(2)*deletelist[0].prix.toFixed(2));
			this.num.total-=this.num[deletelist[0].id];
			this.num[deletelist[0].id]=0;
		},
	},
	
	template: `
		<div>
		   	<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">name</th>
			      <th scope="col">num</th>
			      <th scope="col">prix</th>
			      <th scope="col">totalprix</th>
			      <th scope="col"></th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for='list in data.list'>
			      <th scope="row">{{data.list.indexOf(list)+1}}</th>
			      <td>{{list.name}}</td>
			      <td>{{num[list.id]}}</td>
			      <td>{{list.prix.toFixed(2)}}</td>
			      <td>{{(list.prix*num[list.id]).toFixed(2)}}</td>
			      <td><button class='btn btn-danger' v-on:click='deletelist(data.list.indexOf(list))'><i class="material-icons">delete</i></button></td>
			    </tr>
			    
			  </tbody>
			</table>
			
			
			{{num['total']}}
			totalprix:{{num['totalprix'].toFixed(2)}}
		</div>
		`
}

Vue.component('zw-head', zwhead);
Vue.component('zw-foot', zwfoot);
Vue.component('foodbox', foodbox);
Vue.component('panierlists', panierlists);
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component varructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
var routes = [

	{
		path: '/',
		component: index
	}, 
	{
		path: '/panier',
		component: panier
	}, 
]
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
	routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
var app = new Vue({
	el: '#app',
	data: {
		scroll:0,
		panierlists:{
			list:[],
		},
		foodlists:[],
		num:{
			M1:0,
			M2:0,
			M3:0,
			total:0,
			totalprix:0.0001,
		},
	},
	router,
	
	
	
});
