<template>
  <div class="profile-contain">
    <div class="card col-10 bg-info text-light">
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
      <div class="boutons">
        <button 
          v-on:click="updateProfile()"
          class="send btn btn-dark text-light"
          >
          <b-icon-signpost class="icone"/>Modifier !
        </button>
        <button 
          v-if="user[0].isAdmin === 1"
          v-on:click="deleteProfile()"
          class="delete btn btn-danger text-light"
          >
          <b-icon-trash class="icone"/>Effacer !
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
      async getUserInfos() {
        await axios.get(`auth/user/${this.user[0].id}`)
        .then(response => {
          console.log(response);
          this.form=response.data[0];
        })
        .catch(error => {
          this.data = alert('erreur, rien a afficher !');
          console.log(error + "mal joué !")
        })
      },
      async updateProfile() {
        await axios.put(`auth/user/update/${this.user[0].id}`, this.form)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert(
            "Utilisateur modifié !"
          );
          this.$router.replace({
            name: 'Home'
          })
        })
        .catch(error => {
          this.data = alert("Une erreur s'est produite !");
          console.Log(error);
        })
      },
      /*...mapActions({
        logOutAction: 'auth/logout'
      }),
      logOut () {
        this.logOutAction().then(() => {
          this.$router.replace({
            name: 'Home'
          })
        })
      },*/
      async deleteProfile() {
        if (
        confirm("Etes-vous sûr de vouloir supprimer cet article ?")&&
        confirm("C'est définif, sûr ?")
        ) {
        await axios.delete(`auth/user/delete/${this.user[0].id}`)
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
.profile-contain {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  z-index: 110;
  .card {
    padding: 1%;
    .card-title {
      text-align: center;
      font-size: 1.5em;
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
          font-size: 1em;
          color: $color1;
        }
      }
    }
    .boutons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      .send, .delete {
        width: 20%;
        margin: auto;
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        box-shadow: 4px 4px $color6;
      }
      .send:hover, .delete:hover {
        box-shadow: 6px 6px $color6;
      }
      .alerte {
        font-size: 0.8em;
        color: red;
        background-color: $color6;
        margin: 0;
        padding: 1%;
        border-radius: 20px;
      }
    }
    
  }
}
</style>
