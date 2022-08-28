<template>
  <div>
    <Post v-for="(post, i) in postData" :key="i" :post="post" />
  </div>
</template>
<script>
import Post from "./PostVue.vue";
export default {
  components: {
    Post,
  },
  data() {
    return {
      sampleData: "",
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
  props: {
    postData: Array,
  },
};
</script>
