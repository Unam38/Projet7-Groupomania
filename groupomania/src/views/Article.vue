<template>
  <div id="article">
    <article class="article_detail">
      <div  class="card col-8 text-center">
        <h4 class="card-title">{{ article.title }}</h4>
        <img class="card-img" v-bind:src="article.image || 'https://picsum.photos/300/200?random'" alt="image" />
        <p class="card-body">{{ article.body }}</p>
        <p class="card-date">Créé le : {{ article.createdAt | moment('calendar') }}</p>
        <p v-if="article.createdAt !== article.updatedAt" class="card-date">Modifié le : {{ article.updatedAt | moment('calendar') }}</p>
        <div class="like-dislike">
          <div class="like">
            <b-icon-hand-thumbs-up v-on:click="like()" class="icone"/>
            <p class="like-count">{{ article.likeCount }}</p>
          </div>
          <button v-on:click="cancelVote()" class="btn btn-danger text-warning">Annuler Vote</button>
          <div class="dislike">
            <b-icon-hand-thumbs-down v-on:click="disLike()" class="icone"/>
            <p class="dislike-count">{{ article.dislikeCount }}</p>
          </div>
        </div>
        <div v-if="article.user_id === user[0].id || user[0].isAdmin === 1" class="boutons">
          <button class="modify" v-on:click="showUpdateArticle = true"><b-icon-pencil class="icone1"/>Editer...</button>
          <div class="modal-overlay" v-if="showUpdateArticle">
            <button class="close btn btn-danger text-light" @click="showUpdateArticle = false">X</button>
            <UpdateArticle v-if="showUpdateArticle" />
          </div>
          <button v-on:click.prevent="deleteArticle()" class="deleteArticle" title="Effacer votre message"><b-icon-trash class="icone2"/>Effacer...</button>
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
            <p class="date">{{ comment.createdAt | moment('calendar') }}</p>
            <p v-if="comment.createdAt !== comment.updatedAt" class="date">Modifié le : {{ comment.updatedAt | moment('calendar') }}</p>
            <button v-on:click="showUpdateComment = true" v-if="comment.users_id === user[0].id || user[0].isAdmin === 1"><b-icon-pencil class="icone"/>Modifier commentaire</button>
            <div class="modal-overlay" v-if="showUpdateComment">
              <button class="close btn btn-danger text-light" @click="showUpdateComment = false">X</button>
              <UpdateComment v-if="showUpdateComment" />
            </div>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'
import UpdateArticle from '@/components/modales/UpdateArticle.vue'
import UpdateComment from '@/components/modales/UpdateComment.vue'


export default {
  name: "Article",
  components: {
    UpdateArticle,
    UpdateComment
  },
  data() {
    return {
      id: this.$route.params.id,
      article: {},
      newComment: {
        body: ""
      },
      comments: [],
      showUpdateArticle: false,
      showUpdateComment: false
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
    async getOneArticle() {
      await axios.get(`auth/article/${this.id}`)
        .then(response => {
          let data = response.data;
          this.article = data[0];
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })
    },
    async postComment() {
      await axios.post(`auth/createComment`, {
          body: this.newComment.body,
          users_id: this.user[0].id,
          articles_id: this.id
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
    async findAllArticleComments() {
      await axios.get(`auth/comments/article/${this.id}`)
        .then(response => {
          this.comments = response.data;
          console.log(this.comments);
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })

    },
    async deleteArticle() {
      if (
        confirm("Etes-vous sûr de vouloir supprimer cet article ?")&&
        confirm("C'est définif, sûr ?")
      ) {
      await axios.delete(`auth/article/delete/${this.id}`)
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
    },
    like() {
      axios.post(`auth/${this.id}/likeDislike`, {
        userId: this.user[0].id,
        articleId: this.id,
        likes: 1,
        dislikes: 0
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("le Like a bien été envoyé !");
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    },
    disLike() {
      axios.post(`auth/${this.id}/likeDislike`, {
        userId: this.user[0].id,
        articleId: this.id,
        likes: 0,
        dislikes: 1
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("le Dislike a bien été envoyé !");
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    },
    cancelVote() {
      axios.post(`auth/${this.id}/likeDislike`, {
        userId: this.user[0].id,
        articleId: this.id,
        likes: 0,
        dislikes: 0
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("l'annulation a bien été envoyé !");
        })
        .catch(error => {
          this.data = alert("erreur, fausse route !");
          console.log(error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
#article {
  background-color: $color6;;
  width: 100%;
  margin-top: 130px;
  .article_detail {
    font-family: $font1;
    .card{
      width: 90%;
      margin: 1px auto;
      border-style: none;
      border-radius: 30px;
      box-shadow: 0 10px $color3;;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $color1;
      padding:5px;
      .card-title {
        font-family: $font1;
        font-size: 1em;
        color: $color6;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .card-img {
        max-width: 80%;
        max-height: 300px;
      }
      .card-body {
        font-family: $font1;
        font-size: 0.8em;
        color: $color6;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .card-date {
        font-family: $font1;
        font-size: 0.8em;
        color: $color5;
        @media screen and (min-width: 768px) {
          font-size: 1.5em;
        }
      }
      .like-dislike {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color:$color2;
        color: $color6;
        padding: 0;
        border-radius: 20px;
        width: 90%;
        .like {
          width: 40%;
          padding: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .icone {
            color: green;
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
            color: red;
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
        width: 80%;
        .modify{
          display: block;
          position: relative;
          width: 45%;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: $color6;
          font-family: $font2;
          color: $color1;
          font-size: 0.9em;
          border: 1px solid $color2;
          box-shadow: 0 10px 10px $shad1;
          border-radius: 30px;
          @media screen and (min-width: 768px) {
            font-size: 1.5em;
          }
          .icone1 {
            font-size: 1.2em;
          }
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
        .modal-overlay{
          background-color: #15151693;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
          .close {
            position: absolute;
            top: 40px;
            right: 30px;
            z-index: 110;
            background-color: red;
            width: 40px;
            height: 40px;
          }
        }
        .deleteArticle {
          display: block;
          position: relative;
          width: 45%;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: $color4;
          font-family: $font2;
          color: $color1;
          font-size: 0.9em;
          border: 1px solid $color2;
          box-shadow: 0 10px 10px $shad1;
          border-radius: 30px;
          @media screen and (min-width: 768px) {
            font-size: 1.5em;
          }
          .icone2 {
            font-size: 1.2em;
          }
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
        width: 90%;
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
          @media screen and (min-width: 768px) {
            font-size: 1.5em;
          }
        }
        .comment_corpse {
          display: flex;
          flex-direction: column;
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
            font-size: 0.7em;
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
          .modal-overlay{
            background-color: #15151693;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100;
            .close {
              position: absolute;
              top: 40px;
              right: 30px;
              z-index: 110;
              background-color: red;
              width: 40px;
              height: 40px;
            }
          }
        }
      }
    }
  }
}
</style>