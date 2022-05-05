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

      </div> 

      <button v-on:click="addToCart" 
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
      >
      Add to cart
      </button>

      <button v-on:click="subtractToCart" 
        :disabled="cart <= 0"
        :class="{ disabledButton: cart <= 0 }">
        <span style='font-size:15px;'>&#10006;</span>
        -1
      </button>

        <button class="cart" v-on:click="resetToCart">
          <p class="сounterCart">Cart({{ cart }})</p>
        </button>

    </div>
  `,
  data() {
    return{
      product: 'Niva',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ["1.7 L","EBPO-5","83 l.c."],
      variants: [
      {
        variantId: 2234,
        variantColor: '#6e0000',
        variantImage: '/home/tim/Projects/test-vue-site/img/luxe_172.png',
        variantQuantity: 10    
      },
      {
        variantId: 2235,
        variantColor: 'white',
        variantImage: '/home/tim/Projects/test-vue-site/img/luxe_240.png',
        variantQuantity: 1
      },
      {
        variantId: 2,
        variantColor: 'black',
        variantImage: '/home/tim/Projects/test-vue-site/img/luxe_672.png',
        variantQuantity: 0
      },
      {
        variantId: 3,
        variantColor: 'grey',
        variantImage: '/home/tim/Projects/test-vue-site/img/luxe_633.png',
        variantQuantity: 3
      }
    ],
    cart: 0
  }
},
methods: {
  subtractToCart: function(){
    this.cart -= 1
  },
  resetToCart: function(){
    this.cart = 0
  },
  addToCart: function(){
    this.cart += 1
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
        return 2.99
    }
  }
  })
  
var app = new Vue({
    el: '#app',
    data: {
      premium: true
    }
  })