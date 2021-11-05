<template>
  <q-page class="row justify-center items-center">
      <div class="q-pa-md col-11">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          infinite
          control-color="primary"
          navigation
          padding
          arrows
          height="66vh"
          class="no-border q-px-lg"
        >
          <q-carousel-slide :name="1" class="column fit no-wrap">
            <div class="row fit justify-start q-gutter-md q-px-lg items-center no-wrap">
              <movie-card ></movie-card>
              <movie-card ></movie-card>
              <movie-card ></movie-card>
              <movie-card></movie-card>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column no-wrap">
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/cat.jpg" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/linux-avatar.png" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" class="column no-wrap">
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/material.png" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/donuts.png" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
     
  
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import MovieCard from 'components/movie-card.vue';

export default defineComponent({
  name: 'PageIndex',

  components: {
    MovieCard
  },

  setup () {
    return {
      slide: ref(1)
    }
  }
})
</script>
