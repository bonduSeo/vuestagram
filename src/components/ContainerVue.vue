<template>
  <div>
    <div v-if="step === 0">
      <Post v-for="(post, i) in $store.state.postData" :key="i" :post="post" :index="i" />
    </div>
    <!-- 필터선택페이지 -->
    <div v-if="step === 1">
      <div :class="selectedFilter" class="upload-image" :style="{ backgroundImage: `url(${imgUrl}` }"></div>
      <div class="filters">
        <FilterBox :imgUrl="imgUrl" :filter="filter" v-for="(filter, i) in filterList" :key="i">
          <span>{{ filter }}</span>
        </FilterBox>
      </div>
    </div>
    <!-- 글작성페이지 -->
    <div v-if="step === 2">
      <div :class="selectedFilter" class="upload-image" :style="{ backgroundImage: `url(${imgUrl}` }"></div>
      <div class="write">
        <textarea class="write-box" placeholder="write!" @input="$emit('writeData', $event.target.value)"></textarea>
      </div>
    </div>
  </div>

  <div v-if="step === 3">
    <MyPage :one="1" />
  </div>
</template>
<script>
import Post from "./PostVue.vue";
import FilterBox from "./FilterBox.vue";
import filterData from "../assets/filterList";
import MyPage from "./MyPage.vue";

export default {
  components: {
    Post,
    FilterBox,
    MyPage,
  },
  data() {
    return {
      filterList: filterData,
      selectedFilter: "",
    };
  },
  setup() {},
  created() {},
  mounted() {
    this.emitter.on("selectedFilter", (sf) => {
      this.selectedFilter = sf;
    });
  },
  unmounted() {},

  methods: {},
  props: {
    step: Number,
    imgUrl: String,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
