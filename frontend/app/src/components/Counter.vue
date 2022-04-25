<template>
  <div id="counter">
    <div>{{count}}</div>
    <button v-on:click="decrement">-1</button>
    <button v-on:click="increment">+1</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  computed: {
    count () {
      return this.$store.getters.getCount
    }
  },
  methods: {
    increment () {
      this.$store.dispatch('increment')
    },
    decrement () {
      this.$store.dispatch('decrement')
    }
  }
}
</script>

<style scoped>

</style>