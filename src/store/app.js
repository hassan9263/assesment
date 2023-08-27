// Utilities
import { defineStore } from 'pinia'
import axios from 'axios';

export const useProdStore = defineStore('products', {
  state: () => ({
    products: [

    ],
    cart: 0,
    loader: false

  }),
  getters: {
    getProducts: (state) => state.products,
    getCount: (state) => state.cart

  },
  actions: {
    // Actions which are meant to be setting the data into the store
    async GET_PRODUCTS(payload) {
      try {
        this.loader = true
        const response = (await axios.get('https://fakestoreapi.com/products/'))
        this.products = response.data
        this.loader = false



      } catch (error) {
        console.log(error)
        return error
      }
    },

    async SEARCH_PRODUCTS(payload) {

      try {

        const response = await axios.get(`https://fakestoreapi.com/products${payload.selectedCategory == 'all' ? '' : `/category/${payload.selectedCategory}`}`)

        const regex = new RegExp(payload.query, 'i'); // Case-insensitive search
        this.products = response.data.filter(product => regex.test(product.title));




      } catch (error) {
        console.log(error)
        return error
      }
    },
    ADD_CART() {
      if (localStorage.getItem('cart') == undefined) {
        this.cart = 0
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
      else {
        this.cart++
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    }
  }


})
