<template>
  <div :class="`filter-item ${filter}`" :style="`background-image:url(${imgUrl})`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "filterBox",
  components: {},
  data() {
    return {
      sampleData: "",
    };
  },
  setup() {},
  created() {},
  mounted() {
    console.log(this.filter);
  },
  unmounted() {},
  methods: {},
  props: {
    imgUrl: String,
    filter: String,
  },
};
</script>
<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
