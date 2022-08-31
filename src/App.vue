<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step === 0" @click="step = 3" class="followersBtn">followers</li>
      <li v-if="step === 1" @click="step++">Next</li>
      <li v-if="step === 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :step="step" :imgUrl="imgUrl" @writeData="writeData = $event" />

  <!-- <p>{{ name }},{{ age }},{{ likes }}</p> -->

  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/ContainerVue.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      counter1: 0,
      step: 0,
      imgUrl: "",
      writeData: "",
      selectedFilter: "",
      file: "",
    };
  },
  components: {
    Container,
  },
  computed: {
    // name() {
    //   return this.$store.state.name;
    // },
    ...mapState(["name", "age", "likes"]),
  },
  methods: {
    ...mapMutations(["posting"]),
    ...mapActions(["getData", "getFeedFromDB"]),
    more() {
      // this.$store.dispatch("getData");
      this.getData();
    },
    upload(e) {
      this.file = e.target.files;

      let url = URL.createObjectURL(this.file[0]);
      this.imgUrl = url;
      this.step = 1;
    },
    publish() {
      let myPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imgUrl,
        date: new Date(),
        content: this.writeData,
        filter: this.selectedFilter,
      };
      // this.$store.commit("posting", myPost);
      this.posting(myPost);
      this.uploadServer(myPost);
      this.step = 0;
    },
    uploadServer(myPost) {
      const formData = new FormData(); // FormData 생성
      formData.append("postImage", this.file[0]);
      formData.append("name", myPost.name);
      formData.append("userImage", myPost.userImage);
      formData.append("content", myPost.content);
      formData.append("filter", myPost.filter);

      // formData는 그냥 콘솔로 안보여서 value 확인하는 방법
      // console.log(formData) 하면 아무것도 안나온다.
      for (let value of formData.values()) {
        console.log(value);
      }

      axios({
        url: "backend/crud.php",
        method: "post",
        data: formData,
      })
        .then(function a(response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getFeedFromDB();
  },
  mounted() {
    this.emitter.on("selectedFilter", (sf) => {
      this.selectedFilter = sf;
    });
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 80px;
  cursor: pointer;
  margin-top: 10px;
  text-align: end;
  padding-right: 20px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
