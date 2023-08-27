<template>
  <v-container class="my-16">
    <h1>Results</h1>
    <div class="result-container">
      <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

      <v-row class="mt-6">
        <v-col
          v-for="(product, key) in products"
          :key="key"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="3"
          :class="$vuetify.display.mdAndDown ? '' : 'd-flex justify-center'"
        >
          <v-card
            :width="$vuetify.display.mdAndDown ? '' : '227px'"
            height="284px"
            class="grow"
          >
            <div
              class="d-flex justify-center"
              style="background-color: #f5f5f5"
            >
              <v-img
                :src="product.image"
                width="130px"
                height="130px"
                class="ma-3"
              ></v-img>
            </div>

            <v-card-text class="pa-2">
              <div class="d-flex justify-space-between">
                <p class="text-truncate text-no-wrap" style="max-width: 150px">
                  {{ product.title }}
                </p>
                <v-btn
                  @click="addCart"
                  icon="mdi-cart-plus"
                  class="ms-5"
                  size="small"
                ></v-btn>
              </div>
              <p class="font-weight-black text-body-2">$ {{ product.price }}</p>
            </v-card-text>

            <v-card-title class="pa-2">
              <v-rating
                :model-value="product.rating.rate"
                dense
                color="orange"
                background-color="orange"
                hover
                class="me-2"
                density="compact"
              ></v-rating>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useProdStore } from "@/store/app";
import { computed, ref, reactive } from "vue";
import _ from "lodash";
const store = useProdStore();

//computed properties
const products = computed(() => store.getProducts);
const overlay = computed(() => store.loader);

//methods section


const addCart = () => {
  store.ADD_CART();
};
</script>
<style  scoped>
h1 {
  color: #008ecc;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

</style>