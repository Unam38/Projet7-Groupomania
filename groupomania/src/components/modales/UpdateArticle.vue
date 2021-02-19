<template>
  <article class="modale-block">
    <div class="modale card">
      <h1 class="card-title">Un élément à modifier ?</h1>
      <form class="card-body profile" action="">
        <div class="box">
          <label for="title">Titre :</label>
          <input
            v-model="article.title"
            v-bind:placeholder="article.title"
            id="titre"
            type="text"
            pattern="[a-zA-ZÀ-ÿ]{1,128}"
          />
        </div>
        <div class="box">
          <label for="body">Corps d'article :</label>
          <input
            v-model="article.body"
            v-bind:placeholder="article.body"
            id="body"
            type="text"
            pattern="[a-zA-ZÀ-ÿ]{1,512}"
            />
        </div>
        <div class="box">
          <label for="image">URL d'image :</label>
          <input
            v-model="article.image"
            v-bind:placeholder="article.image"
            id="image"
            type="text"
            pattern="/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)
            (?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/"
          />
        </div>
      </form>
      <button
        v-on:click.prevent="updateArticle()"
        class="boutton"
        type="submit"
        >
        Go !!
      </button>
    </div>
  </article>
</template>

<script>
import axios from "axios";
  import { mapGetters } from 'vuex'

export default {
  name: "UpdateArticle",
  data() {
    return {
      id: this.$route.params.id,
      article: {}
    }
  },
  mounted: function() {
    this.getOneArticle();
  },
  methods: {
    getOneArticle() {
      axios.get(`auth/article/${this.id}`)
        .then(response => {
          let data = response.data;
          this.article = data[0];
          console.log(this.article);
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })
    },
    updateArticle() {
      axios.put(`auth/article/update/${this.id}`, {
        title: this.article.title,
        body: this.article.body,
        image: this.article.image
      })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "l'article a bien été modifié"
          );
          this.$router.replace({
            name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("erreur c'est pas encore ça !");
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
};
</script>

<style lang="scss" scoped>
.modale-block {
  background: #000000c4;
  position: absolute;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;;
    margin: auto;
    padding: 1% 1% 5% 1%;
    background-color: $color2;
    z-index: 1000;
    .card-title {
      font-family: $font2;
      text-align: center;
      font-size: 1.2em;
      color: $color6;
      margin: 0;
      @media screen and (min-width: 600px) {
        font-size: 1.6em;
      }
      @media screen and (min-width: 1024px) {
        font-size: 2em;
      }
    }
    .profile{
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-around;
      padding: 2%;
      margin: 0 2% 0 2%;
      width: 90%;
      @media screen and (min-width: 600px) {
        font-size: 1.6em;
      }
      .box {
        display: flex;
        flex-direction: column;
        max-width: 30%;
      }
    }
    .boutton {
      text-align: center;
      margin: auto;
      border: 2px solid $color6;
      border-radius: 30px;
      background-color: $color1;
      color: $color6;
      box-shadow: 6px 6px 8px $color6;
      position: relative;
      @media screen and (min-width: 600px) {
        font-size: 1.6em;
        padding: 2%;
      }
    }
    .boutton:hover {
      top: 2px;
      cursor: pointer;
      box-shadow: 2px 2px 6px $color6;
      color: $color7;
    }
    .boutton:active {
      top: 4px;
      cursor: pointer;
      box-shadow: 0 0 4px $color6;
      color: $color4;
    }
  }
}

</style>