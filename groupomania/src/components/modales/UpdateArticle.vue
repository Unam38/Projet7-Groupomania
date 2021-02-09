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
        class="submit"
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
      article: {
      }
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
            "l'article"+ data.title +"a bien été modifié"
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
    background-color: $color6;
    padding: 2%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 120px auto;
    .card-title {
      font-size: 1.5em;
      color: $color4;
    }
    .profile {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background-color: $color6;
      .box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 2px auto;
        border: 1px solid $color4;
        label {
          font-family: $font2;
          font-size: 1.2em;
          color: $color1;
        }
        input {
          background-color: transparent;
          border-style: none;
        }
      }
    }
    .modify {
      margin: 20px auto;
      border-radius: 30px;
      color: $color4;
      background-color: $color6;
      margin: 30px auto;
    }
  }
}

</style>