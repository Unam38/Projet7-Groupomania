<template>
  <div class="home col-12">
    <button class="btn">
      <router-link to="/NewArticle">Créez un nouvel article <i class="fas fa-plus-circle"></i></router-link>
    </button>
    <article class="home_detail">
      <div class="card-cart-container">
        <div
          v-for="(article, index) in articles"
          :key="index"
          class="col-xs-12 col-md-3 col-lg-3 card-container">
          <router-link :to='`/Article/${article.id}`'> 
            <div class="card">
              <h4 class="card__title">{{ article.title }}</h4>
              <div class="card__img">
                <img v-bind:src="article.image || 'https://picsum.photos/300/200?random'" alt="image" class="card-image"/>
              </div>
              <p class="card__body">{{ article.body }}</p>
              <p class="card-date">{{ article.createdAt | moment('calendar') }}</p>
              <div v-if="authenticated" class="like-dislike">
                <div class="like">
                  <b-icon-hand-thumbs-up class="icone"/>
                  <p class="like-count">0</p>
                </div>
                <div class="dislike">
                  <b-icon-hand-thumbs-down class="icone"/>
                  <p class="like-count">0</p>
                </div>
              </div>
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
  .btn{
    display: block;
    position: relative;
    margin: 50px auto;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    border-radius: 40% 30% 40% 30%;
    border: none;
    background: radial-gradient($color3, $color1);
    margin-bottom: 20px;
    font-size: 1.5em;
    font-weight: bold;
    box-shadow: 0 2px 8px $color3;
    @media screen and (min-width: 1025px) {
      margin-top: 80px;
    }
    a{
      font-family: $font2;
      text-decoration: none;
      color: $color6;
      i {
        margin-left: 5px;
        font-size: 1em;
      }
    }
  }
  .btn:hover {
    box-shadow: 0 2px 6px $color3;
    top: 2px;
  }
  .btn:active {
    box-shadow: 0 2px 2px $color3;
    top: 6px;
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
          .like-dislike {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color:$color1;
            color: lightgrey;
            padding: 0;
            border-radius: 20px;
            width: 80%;
            .like {
              width: 40%;
              padding: 0;
              margin-left: 5%;
              margin-right: 5%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              .icone {
                color: green;
                display: block;
                position: relative;
                cursor: pointer;
                font-size: 2em;
                text-shadow: 2px 2px 5px #1ed4add0;
              }
              .like-count {
                font-size: 1.2em;
                color: $color6;
                margin-top: 10px;
                padding: 2px 8px 2px 8px;
                border: 1px solid lightgrey;
                border-radius: 20px;
                box-shadow: 2px 2px 1px $shad1;
              }
            }
            .dislike {
              width: 40%;
              padding: 0;
              margin-left: 5%;
              margin-right: 5%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              .icone {
                color: red;
                display: block;
                position: relative;
                cursor: pointer;
                font-size: 2em;
                text-shadow: 2px 2px 5px #1ed4add0;
              }
              .like-count {
                font-size: 1.2em;
                color: $color6;
                margin-top: 10px;
                padding: 2px 8px 2px 8px;
                border: 1px solid lightgrey;
                border-radius: 20px;
                box-shadow: 2px 2px 1px $shad1;
              }
            }
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
