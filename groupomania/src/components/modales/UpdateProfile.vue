<template>
  <div class="modale-block">
    <div class="modale card card col-xs-11 col-sm-11 col-md-9 col-lg-8 col-xl-8">
      <h1 class="card-title">Modifiez vos données :</h1>
      <form action="" class="card-body profile">
        <div class="box">
          <label for="pseudo">Pseudo :</label>
          <input 
            type="text"
            v-bind:placeholder="utilis.pseudo"
            v-model="form.pseudo"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
            />
        </div>
        <div class="box">
          <label for="service">Service :</label>
          <input
            type="text"
            v-bind:placeholder="utilis.service"
            v-model="form.service"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
          />
        </div>
        <div class="box">
          <label for="email">E-mail :</label>
          <input
            type="text"
            v-bind:placeholder="utilis.email"
            v-model="form.email"
          />
        </div>
        <div class="box">
          <label for="photo">Photo :</label>
          <input
            type="text"
            v-bind:placeholder="utilis.photo"
            v-model="form.photo"
          />
        </div>
        <div v-if="user[0].isAdmin === 1" class="box">
          <label for="isAdmin">isAdmin :</label>
          <input
            type="text"
            v-bind:placeholder="utilis.isAdmin"
            v-model="form.isAdmin"
          />
        </div>
      </form>
      <div class="btn-container">
        <button 
          v-on:click="updateProfile()"
          class="boutton"
          >
          <span class="i1"><b-icon-signpost class="icone"/>Modifier</span>
        </button>
        <button 
          v-if="user[0].isAdmin === 1"
          v-on:click="deleteProfile()"
          class="boutton b2"
          >
          <span class="i2"><b-icon-trash class="icone"/>Effacer</span>
        </button>
        <p v-if="user[0].isAdmin === 1" class="alerte">Attention l'effacement est irréversible !<br/>Et supprime toutes les publications de l'utilisateur !</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    name: "Profil",
    data() {
      return {
        id: this.$route.params.id,
        form: {
          pseudo: "",
          service: "",
          email: "",
          photo: "",
          isAdmin: ""
        },
        utilis: {}
      }
    },
    mounted: function() {
      this.getUserInfos()
    },
    methods: {
      getUserInfos() {
        axios.get(`auth/user/${this.id}`)
        .then(response => {
          console.log(response);
          this.form=response.data[0];
        })
        .catch(error => {
          this.data = alert('erreur, rien a afficher !');
          console.log(error + "mal joué !")
        })
      },
      updateProfile() {
        axios.put(`auth/user/update/${this.id}`, this.form)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "Utilisateur modifié !"
          );
          this.$router.replace({
            name: 'Profile'
          })
        })
        .catch(error => {
          this.data = alert("Une erreur s'est produite !");
          console.Log(error);
        })
      },
      deleteProfile() {
        axios.delete(`auth/user/delete/${this.id}`)
        .then(() => {
          alert('Utilisateur supprimé !');
          this.logOut();
          this.$router.replace({
            name: 'Administration'
          });
        })
        .catch(error => {
            console.log(error);
            alert('une erreur !');
        })
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;;
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
    .profile{
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-around;
      padding: 2%;
      margin: 0 2% 0 2%;
      width: 90%;
      @media screen and (min-width: 600px) {
        font-size: 1.6em;
      }
      .box {
        display: flex;
        flex-direction: column;
        max-width: 30%;
      }
    }
    .btn-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin: 0;
      .boutton {
        border: 2px solid $color6;
        border-radius: 30px;
        background-color: $color1;
        color: $color6;
        box-shadow: 6px 6px 8px $color6;
        position: relative;
        margin: 10px auto;
        @media screen and (min-width: 600px) {
          font-size: 1em;
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
      .alerte {
        text-align: center;
        background-color: $color6;
        color: red;
        font-family: $font1;
        font-size: 0.8em;
        padding: 2%;
      }
    }
  }
}
</style>
