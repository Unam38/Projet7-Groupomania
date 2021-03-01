<template>
  <div class="home col-12">
    <div class="tri">
      <button class="btn text-center">
        <router-link to="/NewArticle"><b-icon-plus-circle class="icone"/><span class="long">Créez un nouvel</span> article</router-link>
      </button>
      <button v-on:click="getArticlesByCreatedAt()" class="btn text-center"><b-icon-sort-numeric-down class="icone"/><span class="long">Tri par Date de </span>création</button>
      <button v-on:click="getArticlesByUpdatedAt()" class="btn text-center"><b-icon-sort-numeric-down class="icone"/><span class="long">Tri par date de </span>mise à jour</button>
    </div>
    <article class="home_detail">
      <div class="card-cart-container">
        <div
          v-for="(article, index) in articles"
          :key="index"
          class="col-xs-12 col-md-3 col-lg-3 card-container">
          <router-link :to='`/Article/${article.id}`'> 
            <div class="card">
              <h4 class="card__title">{{ article.title }} {{ article.id }}</h4>
              <div class="card__img">
                <img v-bind:src="article.image || 'https://picsum.photos/300/200?random'" alt="image" class="card-image"/>
              </div>
              <p class="card__body">{{ article.body }}</p>
              <p class="card-date">{{ article.createdAt | moment('calendar') }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: "Home",
  data: () => {
    return {
      articles: []
    }
  },
  mounted: function() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      await axios.get("auth/articles")
      .then(response => {
        let data = response.data;
        this.articles = data.articles;
        console.log(this.articles);
      })
      .catch(error => {
        this.data = alert("erreur, rien a afficher !");
        console.log('pas coucou' + error);
      })
    },
    async getArticlesByCreatedAt() {
      await axios.get("auth/articles/createdAt/")
      .then(response => {
        let data = response.data;
        this.articles = data.articles;
      })
      .catch(error => {
        this.data = alert("erreur, rien a afficher !");
        console.log('pas coucou' + error);
      })
    },
    async getArticlesByUpdatedAt() {
      await axios.get("auth/articles/updatedAt/")
      .then(response => {
        let data = response.data;
        this.articles = data.articles;
      })
      .catch(error => {
        this.data = alert("erreur, rien a afficher !");
        console.log('pas coucou' + error);
      })
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 50px;
  padding: 2%;
  .tri{
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0;
    .btn{
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid $color1;
      background: linear-gradient(to bottom, $color1, $color5);
      color: $color6;
      font-size: 0.7em;
      margin-top: 30px;
      width: 25%;
      border-radius: 30%;
      @media screen and (min-width: 768px) {
        font-size: 1em;
      }
      a {
        text-decoration: none;
        color: $color6;
        @media screen and (min-width: 768px) {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .icone {
        font-size: 1.2em;
        @media screen and (min-width: 768px) {
        font-size: 1.5em;
      }
      }
      .long{
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }
  &_detail {
    justify-content: center;
    align-items: center;
    .card-cart-container{
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: flex-start;
      .card-container {
        margin: 10px 2% 10px 2%;
        padding: 0;
        width: 300px;
        a {
          text-decoration: none;
        }
        .card{
          display: block;
          position: relative;
          width: 100%;
          border-style: none;
          border-radius: 40px 0 40px 0;
          box-shadow: 0 10px $color3;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(45deg, $color3, $color1);
          padding:5px;
          &__title {
            font-size: 1.5em;
            font-family: $font2;
            font-style: italic;
            background-color: $color5;
            border-radius: 30px;
            padding: 5px 8px;
            margin-top: 10px;
            margin-right: 10px;
            margin-left: 10px;
            box-shadow: 0 5px 5px $shad1;
            color: $color6;
          }
          &__img{
            margin: 10px;
            padding: 0;
            img{
              width: 100%;
              border-radius: 20px;
            }
          }
          &__body{
            background-color: $color2;
            font-family: $font1;
            color: $color6;
            width: 94%;
            max-height: 200px;
            margin: 3%;
            padding: 3%;
            font-size: 1em;
            border-radius: 30px;
            box-shadow: 0 5px 5px $shad1;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            @media screen and (min-width: 768px) {
              font-size: 1.5em;
            }
          }
          .card-date {
            font-size: 1em;
            font-family: $font2;
            font-style: italic;
            background-color: $color5;
            border-radius: 30px;
            padding: 5px 8px;
            margin-top: 10px;
            margin-right: 10px;
            margin-left: 10px;
            box-shadow: 0 5px 5px $shad1;
            color: $color6;
          }
        }
        .card:hover {
          box-shadow: 0 8px $color6;
          top: 4px;
        }
        .card:active {
          box-shadow: 0 2px $color6;
          top: 8px;
        }
      }
    }
  }
}

</style>
