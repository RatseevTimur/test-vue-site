var app = new Vue({
    el: '#app',
    data: {
      product: 'Niva',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ["1.7 L","EBPO-5","83 l.c."],
      variants: [
        {
          variantId: 0,
          variantColor: '#6e0000',
          variantImage: '/home/tim/Projects/test-vue-site/img/luxe_172.png',
          variantQuantity: 10    
        },
        {
          variantId: 1,
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
  },
  methods: {
    subtractToCart(){
      this.cart -= 1
    },
    resetToCart(){
      this.cart = 0
    },
    addToCart() {
      this.cart += 1
    },
    updateProduct: function(index) {  
      this.selectedVariant = index
  }
}
    /*updateProduct(variantImage) {
      this.image = variantImage
    }*/,
    computed: {
      title() {
          return this.brand + ' ' + this.product  
      },
      image(){
          return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
          return this.variants[this.selectedVariant].variantQuantity
      }
  
    }
  })