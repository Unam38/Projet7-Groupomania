<template>
  <div id="administration">
      <header class="head col-11">
          <h1 class="title">Page d'administration des utilisateurs :</h1>
      </header>
      <section class="users col-12">
        <div class="card-cart-container">
          <div :key="index" v-for="(utilisateur, index) in utilisateurs" class="col-xs-12 col-md-3 col-lg-3 card-container">
            <router-link :to='`/UpdateProfile/${utilisateur.id}`'>
              <div class="card">
                <div class="card-title">Pseudo : {{ utilisateur.pseudo }}</div>
                <div class="card-img">
                  <img v-bind:src="utilisateur.photo" alt="avatar de l'utilisateur">
                </div>
                <div class="text">Service : {{utilisateur.service}}</div>
                <div class="text">Mail : {{utilisateur.email}}</div>
                <div class="text">isAdmin : {{utilisateur.isAdmin}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data: () => {
    return {
      utilisateurs: []
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },
  mounted: function() {
    this.getUsers()
  },
  methods: {
    getUsers(){
      axios.get('auth/users/')
      .then(response => {
        this.utilisateurs=response.data;
      })
      .catch(error => {
        this.data = alert('erreur, rien a afficher !');
        console.log(error + "mal joué !")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#administration {
  margin-top: 120px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .head {
    background-color: $color1;
    border-radius: 50px;
    padding: 3%;
    .title{
      text-align: center;
      font-family: $font1;
      font-size: 1em;
      color: $color6;
    }
  }
  .users{
    margin: 0;
    padding: 0;
    .card-cart-container{
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: flex-start;
      .card-container{
        margin: 10px 2% 10px 2%;
        padding: 0;
        width: 300px;
        a {
          text-decoration: none;
          .card {
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
            .card-title {
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
            .card-img {
              text-align: center;
              margin: 10px;
              padding: 0;
              img{
                max-width: 100%;
                max-height: 100px;
                border-radius: 20px;
              }
            }
            .text {
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
            }
          }
        }
      }
    }
  }
}
</style>