<template>
  <v-app>
    <appbar />
    <v-main>
      <div
        :class="
          $vuetify.display.smAndDown ? ' d-flex justify-center' : 'd-none'
        "
      >
        <div class="search-bar">
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
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import appbar from "../../components/AppBar.vue";
import { useProdStore } from "@/store/app";
import { ref, reactive, watch } from "vue";
import _ from "lodash";
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
.search-bar {
  width: 80%;
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  border: 5px;
}
</style>
