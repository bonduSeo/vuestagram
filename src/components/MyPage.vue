<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="🔍" @input="serch" />
    <div class="post-header" v-for="item in serchedFollower" :key="item.id">
      <div class="profile" :style="{ backgroundImage: `url(${item.image})` }"></div>
      <span class="profile-name">{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "MyPage",
  props: {
    one: Number,
  },

  setup(props) {
    let follower = ref([]);
    let serchedFollower = ref([]);
    //연습
    let { one } = toRefs(props);
    console.log(one.value);

    let store = useStore();
    console.log(store.state.name);

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
        serchedFollower.value = a.data;
      });
    });

    function serch(e) {
      serchedFollower.value = follower.value.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
    }
    return { serchedFollower, serch };
  },
};
</script>
