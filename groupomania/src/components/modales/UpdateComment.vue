<template>
  <div class="update-comment">
    <form class="upComment card col-xs-11 col-sm-11 col-md-9 col-lg-8 col-xl-8" action="" method="post">
      <h2 class="card-title">Quelque chose à changer ?</h2>
      <div class="input-box card-body">
        <b-icon-newspaper class="icone"/>
        <input
          v-bind:placeholder="comment.body"
          v-model="newComment.body"
          id="body"
          type="text"
          pattern="[a-zA-ZÀ-ÿ]{1,512}"
          />
      </div>
      <div class="submit-btn-container">
          <button
              v-on:click.prevent="updateComment()"
              class="boutton"
              type=""
              >
              <span class="i1"><b-icon-signpost class="icone"/>Modifier</span>
          </button>
          <button
              v-on:click.prevent="deleteComment()"
              class="boutton">
              <span class="i2"><b-icon-trash class="icone"/>Effacer</span>
          </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'

export default {
  name: "UpdateArticle",
  data() {
    return {
      id: this.$route.params.id,
      comment: {
        id: "",
        body:"",
        createdAt:"",
        users_id: "",
        articles_id:""
      },
      newComment: {
          Body: ""
      }
    }
  },
  mounted: function() {
    this.getComment();
  },
  methods: {
    getComment() {
      axios.get(`auth/comment/${this.id}`)
        .then(response => {
          let data = response.data;
          this.comment = data[0];
          console.log(this.comment);
        })
        .catch(error => {
          this.data = alert("erreur, rien a afficher !");
          console.log('pas bien' + error);
        })
    },
    updateComment() {
        axios.put(`auth/comment/update/${this.id}`,
        {
            body: this.newComment.body
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "le commentaire a bien été modifié !"
          );
          this.$router.replace({
              name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("une erreur s'est produite !");
          console.log(error);
        });
    },
    deleteComment() {
        axios.delete(`auth/comment/delete/${this.id}`)
        .then(() => {
            alert('Commentaire effacé !');
            this.$router.replace({
                name: 'Home'
            });
        })
        .catch(error => {
            console.log(error);
            alert('une erreur !');
        })
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    }
  }
};
</script>

<style scoped lang="scss">
.update-comment {
  background: #000000c4;
  position: absolute;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  .upComment { // card
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
    .input-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 5%;
      margin: 2%;
      width: 90%;
      @media screen and (min-width: 600px) {
        font-size: 1.6em;
      }
      .icone {
        color: $color6;
        font-size: 1.5em;
        margin: auto;
      }
      input {
        width: 80%;
        font-family: $font2;
        color: $color1;
        font-size: 1.2em;
      }

    }
    .submit-btn-container {
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .boutton {
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
        .i1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2%;
        }
        .i2 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
}
</style>