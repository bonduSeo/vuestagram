<template>
  <div class="post" @click="likePost">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage: `url(${post.userImage})` }"></div>
      <span class="profile-name">{{ post.name }}</span>
    </div>
    <div :class="post.filter" class="post-body" :style="{ backgroundImage: `url(${post.postImage})` }"></div>
    <div class="post-content">
      <p>{{ $store.state.likes[index] }} Likes</p>
      <p>
        <strong>{{ post.name }}</strong> {{ post.content }}
      </p>
      <p class="date">{{ post.date }}</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      liked: [false, false, false],
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    likePost() {
      this.$store.commit("likePost", [this.liked[this.index], this.index]);
      this.liked[this.index] = !this.liked[this.index];
    },
  },
  props: {
    post: Object,
    index: Number,
  },
};
</script>
<style>
.post {
  width: 100%;
}
.profile {
  /* background-image: url("https://placeimg.com/100/100/arch"); */
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  /* background-image: url("https://placeimg.com/640/480/animals"); */
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-body img {
  width: 100%;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>
