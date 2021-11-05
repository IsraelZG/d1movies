<template>
  <div class="col-3">
    <q-card class="rounded-borders no-border full-height shadow-up-5 rectangle">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" :ratio="3/5">
        <div class="absolute-bottom">
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  setup () {
    return {}
  }
}
</script>
