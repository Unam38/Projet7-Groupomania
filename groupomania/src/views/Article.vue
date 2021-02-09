<template>
  <div id="article">
    <article class="article_detail">
      <div  class="card text-center">
        <h4 class="card__title">{{ article.title }}</h4>
        <img class="card__img" v-bind:src="article.image || 'https://picsum.photos/300/200?random'" alt="image" />
        <p class="card__body">{{ article.body }}</p>
        <div class="like-dislike">
          <div class="like">
            <b-icon-hand-thumbs-up class="icone"/>
            <p class="like-count">0</p>
          </div>
          <div class="dislike">
            <b-icon-hand-thumbs-down class="icone"/>
            <p class="dislike-count">0</p>
          </div>
        </div>
        <div v-if="article.user_id === user[0].id" class="boutons">
          <router-link class="modify" :to="`/UpdateArticle/${article.id}`" title="Editez, modifiez votre Article"><b-icon-pencil class="icone1"/>Modifier...</router-link>
          <button v-on:click.prevent="deleteArticle()" class="deleteArticle" title="Effacer votre message"><b-icon-trash class="icone2"/>Supprimer...</button>
        </div>
        <section class="create_comment">
          <h2 class="title">Votre commentaire :</h2>
          <div class="comment_corpse">
            <input v-model="newComment.body" class="commentaire" placeholder="Ici Votre commentaire..." type="text" pattern="[a-zA-ZÀ-ÿ]{1,512}" />
            <button v-on:click.prevent="postComment()" class="comment-btn" type="submit">Go !</button>
          </div>
        </section>
        <section class="display_comments">
          <div :key="index" v-for="(comment, index) in comments" class="commentaire">
            <p class="body">{{ comment.body }}</p>
            <p class="date">{{ comment.date }}</p>
            <router-link :to='`/UpdateComment/${comment.id}`' v-if="comment.users_id === user[0].id"><b-icon-pencil class="icone"/>Modifier commentaire</router-link>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'

export default {
  name: "Article",
  data() {
    return {
      id: this.$route.params.id,
      article: {},
      newComment: {
        body: "",
        users_id:"",
        articles_id:"",
        date: ""
      },
      comments: []
    }
  },
  created() {
    this.getOneArticle();
  },
  beforeMount() {
    this.findAllArticleComments();
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    getOneArticle() {
      axios
        .get(`auth/article/${this.id}`)
        .then(response => {
          let data = response.data;
          this.article = data[0];
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })
    },
    postComment() {
      axios.post(`auth/createComment`, {
          body: this.newComment.body,
          users_id: this.user[0].id,
          articles_id: this.article.id,
          date: this.newComment.date
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("le Commentaire a été envoyé !");
          this.$router.replace({
            name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    },
    findAllArticleComments() {
      axios.get(`auth/comments/article/${this.id}`)
        .then(response => {
          this.comments = response.data;
          console.log(this.comments);
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })

    },
    deleteArticle() {
      axios.delete(`auth/article/delete/${this.id}`)
      .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("L'article a bien été supprimé !");
          this.$router.replace({
            name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("erreur, pas d'effacement !")
          console.log(error);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#article {
  background-color: $color6;;
  width: 100%;
  margin-top: 100px;
  .article_detail {
    font-family: $font1;
    .card{
      width: 80%;
      margin: 1px auto;
      border-style: none;
      border-radius: 20%;
      box-shadow: 0 10px $color3;;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $color1;
      padding:5px;
      &__title {
        font-size: 1.5em;
        font-family: $font1;
        font-style: italic;
        background-color: $shad1;
        border-radius: 30px;
        border: 1px solid $color2;
        padding: 8px 10px;
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
        box-shadow: 0 5px 5px #a8dcd4d2;
        color: $color1;
      }
      &__img{
        margin: 10px;
        padding: 0;
        border-radius: 30px;
        img{
            width: 100%;
        }
      }
      &__body{
        background-color: $shad1;
        font-family: $font1;
        color: $color1;
        width: 96%;
        max-height: 200px;
        margin: 2%;
        padding: 5px;
        font-size: 1.5em;
        border: 1px solid $color2;
        border-radius: 30px;
        box-shadow: 0 5px 5px $shad1;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis; 
      }
      .like-dislike {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color:$color3;
        color: $color6;
        padding: 0;
        border-radius: 20px;
        width: 50%;
        .like {
          width: 40%;
          padding: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .icone {
            display: block;
            position: relative;
            margin-left: 30px;
            margin-right: 10px;
            cursor: pointer;
            font-size: 2em;
            text-shadow: 2px 2px 5px $shad1;
          }
          .icone:hover {
            top: 2px;
            text-shadow: 2px 2px 3px $shad1;
            color: #3cc50e;
          }
          .icone:active {
            top: 4px;
            text-shadow: 2px 2px 1px $shad1;
          }
          .like-count {
            display: block;
            position: relative;
            top: 5px;
            font-size: 1.2em;
            color: #3cc50e;
            padding: 2px 8px 2px 8px;
            border: 1px solid $color6;
            border-radius: 20px;
            box-shadow: 2px 2px 1px $shad1;
          }
        }
        .dislike {
          width: 40%;
          padding: 0;

          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .icone {
            display: block;
            position: relative;
            margin-left: 30px;
            margin-right: 10px;
            cursor: pointer;
            font-size: 2em;
            text-shadow: 2px 2px 5px $shad1;
          }
          .icone:hover {
            top: 2px;
            text-shadow: 2px 2px 3px $shad1;
            color: #3cc50e;
          }
          .icone:active {
            top: 4px;
            text-shadow: 2px 2px 1px $shad1;
          }
          .dislike-count {
            display: block;
            position: relative;
            top: 5px;
            font-size: 1.2em;
            color: #3cc50e;
            margin-right: 50px;
            padding: 2px 8px 2px 8px;
            border: 1px solid $color6;
            border-radius: 20px;
            box-shadow: 2px 2px 1px $shad1;
          }
        }
      }
      .boutons{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 60%;
        .modify{
          display: block;
          position: relative;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: $color6;
          font-family: $font2;
          color: $color1;
          font-size: 2em;
          border: 1px solid $color2;
          box-shadow: 0 10px 10px $shad1;
          border-radius: 30px;
          }
        .modify:hover {
          top: 2px;
          color: $color4;
          box-shadow: 0 8px 8px $shad1;
        }
        .modify:active {
          top: 8px;
          box-shadow: 0 2px 2px $shad1;
        }
        .deleteArticle {
          display: block;
          position: relative;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: $color4;
          font-family: $font2;
          color: $color1;
          font-size: 2em;
          border: 1px solid $color2;
          box-shadow: 0 10px 10px $shad1;
          border-radius: 30px;
        }
        .deleteArticle:hover {
          top: 2px;
          cursor: pointer;
          color: $color6;
          box-shadow: 0 8px 8px $shad1;
        }
        .deleteArticle:active {
          top: 8px;
          color: $color6;
          box-shadow: 0 2px 2px $shad1;
        }
      }
      .create_comment {
        width: 50%;
        font-family: $font2;
        background-color: $color6;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        .title {
          font-family: $font2;
          margin: 5px auto;
          font-size: 1.2em;
          color: $color1;
        }
        .comment_corpse {
          display: flex;
          flex-direction: row;
          margin: 5px auto;
          .commentaire {
            font-family: $font2;
            font-size: 1.1em;
            border-radius: 20px;
            margin-right: 10px;
          }
          .comment-btn {
            display: block;
            position: relative;
            margin: 10px auto;
            padding: 2px 15px 8px 15px;
            text-decoration: none;
            background-color: $color3;
            font-family: $font1;
            color: $color6;
            font-size: 1.2em;
            border-style: none;
            box-shadow: 0 10px 10px $color5;
            border-radius: 30px;
            cursor: pointer;
          }
          .comment-btn:hover {
            top: 2px;
            box-shadow: 0 8px 8px $color5;
          }
          .comment-btn:active {
            top: 8px;
            box-shadow: 0 2px 2px $color5;
          }
        }
      }
      .display_comments {
        font-family: $font1;
        .commentaire {
          background-color: $color6;
          padding: 20px;
          border-radius: 30px;
          border: 1px solid $color3;
          color: $color1;
          margin: 2px auto;
          .body {
            padding-right: 20px;
            padding-left: 20px;
            font-size: 1em;
            border-bottom: 2px solid $color1;
            border-radius: 0 0 30px 0;
          }
          .date {
            font-size: 0.5em;
          }
          a {
            text-decoration: none;
            color: $color1;
            font-family: $font2;
            font-size: 1em;
            .icone {
              color: $color4;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>