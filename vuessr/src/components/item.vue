<template>
  <h1>{{item.title}}</h1>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    // 触发action代码，会返回 Promise
    return store.dispatch('fetchItem', route.params.id);
  },
  name: "item",
  data(){
    return{
       
    }
  },
  computed: {
    // 从 store 的 state对象中获取item
    item() {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>
<style>

</style>