<template>
  <div class="profile">
    <section class="profile__section">
      <h1 class="profile__section__title">Votre Profil Utilisateur :</h1>
      <div class="profile__section__identity">
        <div class="profile__section__identity__pseudo">Votre Pseudo : {{ user[0].pseudo }}</div>
        <div class="profile__section__identity__email">Votre adresse email : {{ user[0].email}}</div>
        <div class="profile__section__identity__service">Vous travaillez dans le service : {{ user[0].service }}</div>
        <div class="profile__section__identity__image">Votre image d'avatar : <img v-bind:src="user[0].photo || 'https://picsum.photos/300/200?random'" alt="image avatar" class="profil_detail__avatar"/></div>
        <div class="modifier">Soufaitez-vous modifier ces informations ?</div>
        <router-link :to='`/UpdateProfile/${user[0].id}`'><b-icon-pencil class="icone"/> Modifier !!</router-link>
        <div class="effacer">
          <h2 class="titre">Effacer votre compte ?</h2>
          <h3 class="warning">Attention, ceci effacera également tous vos messages et commentaires...</h3>
          <button v-on:click.prevent="deleteUser()" class="trash"><b-icon-trash class="icone"/></button>
        </div>
      </div>
    </section>
    <article class="publications">
      <h2 class="articles">Vos publications :</h2>
      <div class="card-cart-container col-12">
        <div :key="index" v-for="(article, index) in articles" class="col-xs-12 col-md-3 col-lg-3 card-container">
          <router-link :to='`/Article/${article.id}`'> 
            <div class="card">
              <h4 class="card__title">{{ article.title }}</h4>
              <div class="card__img">
                <img v-bind:src="article.image || 'https://picsum.photos/300/200?random'" alt="image" class="card-image"/>
              </div>
              <p class="card__body">{{ article.body }}</p>
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
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Profile",
  data: () => {
    return {
      articles: [],
    }
  },
  mounted: function() {
    this.getArticlesFromUser();
  },
  /* 
  ** Récupérer ses publications **
  ** lien pour la modification de ses données personnelles **
  */
 methods: {
    getArticlesFromUser() {
      axios.get(`auth/articles/user/${this.user[0].id}`)
      .then(response => {
        let data = response.data;
        this.articles = data;
      })
      .catch(error => {
        this.data = alert("erreur, rien a afficher !");
        console.log('pas coucou' + error);
      })
    },
    deleteUser() {
      if (
        confirm("etes vous sûr de vouloir supprimer le profil ?") &&
        confirm("La suppression efface toutes les publications...")
      ) {
      axios.delete(`auth/user/delete/${this.user[0].id}`)
      .then(() => {
        alert('Utilisateur supprimé !');
        this.logOut();
        this.$router.replace({
          name: 'Home'
        });
      })
      .catch(error => {
          console.log(error);
          alert('une erreur !');
      })
      }
    },
    ...mapActions({
      logOutAction: 'auth/logout'
    }),
    logOut () {
      this.logOutAction().then(() => {
        this.$router.replace({
          name: 'Home'
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  }

}
</script>

<style lang="scss" scoped>
.profile {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: $color6;
  &__section {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $color6;
    &__title {
      font-family: $font1;
      font-size: 1.5em;
      color: $color1;
      padding: 1%;
      border-radius: 50px;
      border-bottom: 2px solid $color4;
    }
    &__identity {
      background-color: $color5;
      padding: 2%;
      display: flex;
      border-radius: 50px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &__pseudo {
        font-family: $font1;
        font-size: 1em;
        color: $color6;
      }
      &__email {
        font-family: $font1;
        font-size: 1em;
        color: $color6;
      }
      &__service {
        font-family: $font1;
        font-size: 1em;
        color: $color6;
      }
      &__image {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: $font1;
        font-size: 1em;
        color: $color6;
        img {
          border-radius: 40px;
          max-width: 20%;
        }
      }
      .modifier {
        font-family: $font1;
        font-size: 1em;
        color: $color6;
      }  
      a {
        position: relative;
        display: block;
        margin: 5px auto;
        text-decoration: none;
        color: $color1;
        font-size: 1.5em;
        background-color: $color6;
        border-radius: 30px;
        box-shadow: 4px 4px 8px $color4;
        padding: 2%;
        .icone {
          color: $color4;
          font-size: 2em;
        }
      }
      a:hover {
        top: 2px;
        box-shadow: 3px 3px 6px $color4;
      }
      a:active {
        top: 4px;
        box-shadow: 1px 1px 3px $color4;
      }
      .effacer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
        .titre {
          font-family: $font1;
          font-size: 1em;
          color: $color6;
        }
        .warning {
          font-family: $font1;
          font-size: 1em;
          color: red;
          background-color: $color7;
        }
        .trash {
          display: block;
          position: relative;
          margin: 5px auto;
          background-color: $color7;
          border: none;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 5px 5px 8px $shad1;
          .icone {
            color: red;
            font-size: 2em;
          }
        }
        .trash:hover {
          top: 2px;
          box-shadow: 3px 3px 6px $shad1;
          background-color: red;
          .icone {
            color: $color7;
          }
        }
        .trash:active {
          top: 4px;
          box-shadow: 1px 1px 4px $shad1;
          background-color: red;
          .icone {
            color: $color7;
          }
        }
      }
    }
  }
  .publications {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $color6;
    .articles {
      font-family: $font1;
      font-size: 1.5em;
      color: $color1;
      padding: 1%;
      border-radius: 50px;
      border-bottom: 2px solid $color4;
    }
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
            background-color: $color5;
            font-family: $font1;
            color: $color6;
            width: 96%;
            max-height: 200px;
            margin: 2%;
            padding: 5px;
            font-size: 1.5em;
            border-radius: 30px;
            box-shadow: 0 5px 5px $shad1;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis; 
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
                display: block;
                position: relative;
                cursor: pointer;
                font-size: 2em;
                text-shadow: 2px 2px 5px #1ed4add0;
              }
              .icone:hover {
                top: 2px;
                text-shadow: 2px 2px 3px #1ed4add0;
                color: #3cc50e;
              }
              .icone:active {
                top: 4px;
                text-shadow: 2px 2px 1px #1ed4add0;
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
                display: block;
                position: relative;
                cursor: pointer;
                font-size: 2em;
                text-shadow: 2px 2px 5px #1ed4add0;
              }
              .icone:hover {
                top: 2px;
                text-shadow: 2px 2px 3px #1ed4add0;
                color: $color4;
              }
              .icone:active {
                top: 4px;
                text-shadow: 2px 2px 1px #1ed4add0;
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