<template>
  <article class="article-contain">
    <div class="card col-10 bg-info text-light">
      <h1 class="card-title">Un élément à modifier ?</h1>
      <form class="card-body profile" action="">
        <div class="box">
          <label for="title">Titre :</label>
          <input
            v-model="article.title"
            v-bind:placeholder="article.title"
            autofocus
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
        class="send btn btn-dark text-light"
        type="submit"
        >
        <b-icon-pencil class="icone"></b-icon-pencil> Modifier !!
      </button>
    </div>
  </article>
</template>

<script>
  import axios from "axios";

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
    }
  };
</script>

<style lang="scss" scoped>
  .article-contain {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    z-index: 110;
    .card {
      padding: 1%;
      .card-title {
        font-size: 1.2em;
      }
      .card-body {
        .box {
          display: flex;
          justify-content: space-between;
          label {
            display: inline-flex;
            justify-content: center;
            width: 25%;
            text-decoration: underline;
          }
          input {
            width: 75%;
          }
        }
      }
      .send {
        width: 30%;
        margin: auto;
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        box-shadow: 4px 4px $color6;
      }
      .send:hover {
        box-shadow: 6px 6px $color6;
      }
    }
  }
</style>