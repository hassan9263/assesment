<template>
  <div>
    <v-app-bar height="90" :elevation="2">
      <v-container class="d-flex align-center justify-space-between">
        <div class="logo">
          <v-chip
            class="ma-2 pa-4 logo-chip"
            color="#008ECC"
            text-color="white"
            size="x-large"
            label
          >
            M
          </v-chip>
          <logo class="logo" />
        </div>

        <div :class="$vuetify.display.smAndDown ? 'd-none' : 'search-bar'" >
          <v-select
            variant="solo"
            hide-details
            bg-color="#F3F9FB"
            flat
            v-model="selectedCategories"
            :items="categories"
            item-title="item"
            item-value="val"
            return-object
          ></v-select>
          <v-text-field
            label="Enter Search..."
            variant="solo"
            hide-details
            v-model="searchText"
            flat
            bg-color="#F3F9FB"
          >
            <template v-slot:append-inner>
              <v-icon icon="mdi-magnify" color="#008ECC"></v-icon>
            </template>
          </v-text-field>
        </div>
        <div class="cart">
          <carticon />
          <span class="mr-3 ml-1">cart</span>
          <v-chip
            v-if="count != undefined"
            class="ma-2"
            color="#008ECC"
            text-color="white"
          >
            {{ count }}
          </v-chip>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script setup>
import logo from "../components/icons/logo.vue";
import carticon from "../components/icons/cart.vue";
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useProdStore } from "@/store/app";
import _ from "lodash";

// Data Section
const store = useProdStore();
const selectedCategories = ref({ item: "All", val: "all" });
const categories = reactive([
  { item: "All", val: "all" },
  { item: "Mobile", val: "mobile" },
  { item: "Games", val: "games" },
  { item: "Toys", val: "toys" },
  { item: "Deals", val: "deals" },
  { item: "Books", val: "books" },
]);
const searchText = ref("");


// Computed Section

//computed properties

const count = computed(() => store.getCount);
//Mounted Section
onMounted(() => {
  getProducts();
  store.ADD_CART();
});

// Watch section


watch(searchText, (newVal) => {
  if (newVal != "") {
    searchProducts();
  } else {
    getProducts();
  }
});
watch(selectedCategories, (newVal) => {
  searchProducts();
});

// Methods Section
const getProducts = _.debounce(() => {
  let payload = {
    selectedCategory: selectedCategories.value.val,
    query: searchText.value,
  };

  store.GET_PRODUCTS(payload);
}, 500);
const searchProducts = _.debounce(() => {
  let payload = {
    selectedCategory: selectedCategories.value.val,
    query: searchText.value,
  };

  store.SEARCH_PRODUCTS(payload);
}, 500);
</script>

<style scoped>
.logo,
.cart {
  display: flex;
  align-items: center;
}
.logo {
  margin: 0 8px;
  margin-top: 5px;
}

.search-bar {
  width: 507px;
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  border: 5px;
}
</style>