Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
      <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
      }
    }
  }
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >

               <p class="сounter">{{ variant.variantQuantity }}</p>
          </div> 

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>

       </div>  

       <div>
              <p v-if="!reviews.length">There are no reviews yet.</p>
              <ul v-else>
                  <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating:{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                  </li>
              </ul>
          </div>
         
         <product-review @review-submitted="addReview"></product-review>
    
    </div>
   `,
  data() {
    return {
        product: 'Legend',
        brand: 'Niva',
        selectedVariant: 0,
        details: ["1.7 L","EBPO-5","83 l.c."],
        variants: [
          {
            variantId: 1,
            variantColor: '#6e0000',
            variantImage: 'img/luxe_172.png',
            variantQuantity: 10    
          },
          {
            variantId: 2,
            variantColor: 'white',
            variantImage: 'img/luxe_240.png',
            variantQuantity: 1
          },
          {
            variantId: 3,
            variantColor: 'black',
            variantImage: 'img/luxe_672.png',
            variantQuantity: 0
          },
          {
            variantId: 4,
            variantColor: 'grey',
            variantImage: 'img/luxe_633.png',
            variantQuantity: 3    
          }
        ],
        reviews: []
    }
  },
    methods: {
      addToCart: function() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct: function(index) {  
          this.selectedVariant = index
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 1.28 + "mln"
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      },///////////////////////////////////////
      /*subtractToCart: function(){
        this.cart.splice(-1,1)
      },
      resetToCart: function(){
        this.cart = 0
      },*////////////////////////////////////////
    }
})