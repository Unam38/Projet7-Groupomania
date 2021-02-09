<template>
  <div class="update-comment">
    <form class="upComment" action="" method="post">
      <h2>Quelque chose à modifier ?</h2>
      <div class="input-box">
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
                class="submit"
                type=""
                >
                <span class="envoyer"><b-icon-signpost class="icone"/>Modifier !</span>
            </button>
            <button
                v-on:click.prevent="deleteComment()"
                class="delete">
                <span class="effacer"><b-icon-trash class="icone"/>Effacer !</span>
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
    background-color: $color6;
    padding-top: 30px;
    padding-bottom: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    .upComment {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 500px;
        background: $color1;
        margin: 8% auto;
        padding: 50px 0;
        color: $color6;
        box-shadow: 0 0 10px 3px $color3;
        h2 {
            font-size: 1.5em;
            font-family: $font1;
            color: $color6;
            padding: 5px 10px 5px 10px;
            border-bottom: 2px solid $color6;
            border-radius: 0 0 30px 0;
            box-shadow: 2px 2px 2px $shad1;
        }
        .input-box {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 80%;
            border-bottom: 1px solid $color4;
            border-radius: 0 0 30px 0;
            padding: 10px 10px 5px 0;
            input {
                width: 90%;
                border: none;
                outline: none;
                background: transparent;
                font-family: $font1;
                font-size: 1.2em;
                color: $color6;
            }
        }
        ::placeholder {
            color: $color6;
        }
        .icone {
            margin-right: 10px;
            color: $color3;
            font-size: 1.5em;
            text-shadow: 2px 2px 2px $shad1;
        }
        a {
            text-decoration: none;
        }
        .submit-btn-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 80%;
            .submit {
                display: block;
                position: relative;
                text-decoration: none;
                margin: 40px auto 20px;
                cursor: pointer;
                font-size: 2em;
                background-color: $color6;
                color: $color4;
                border: none;
                padding: 10px;
                border-radius: 30px;
                .envoyer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 1em;
                    font-family: $font2;
                    .icone {
                        color: $color4;
                        font-size: 1.5em;
                    }
                }
            }
            .delete {
                display: block;
                position: relative;
                text-decoration: none;
                margin: 40px auto 20px;
                cursor: pointer;
                font-size: 2em;
                background-color: $color6;
                color: $color4;
                border: none;
                padding: 10px;
                border-radius: 30px;
                .effacer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 1em;
                    font-family: $font2;
                    .icone {
                        color: $color4;
                        font-size: 1.5em;
                    }
                }
            }
        }
    }
}
</style>