<template>
  <div class="profil">
    <div class="profil-container">
      <h1><i class="icon fas fa-user"></i> Votre profil !</h1>
      <div class="profil_detail">
        <ul class="profil_detail_list">
          <li><span class="titre">Pseudo :</span><span class="data">{{ user.pseudo }}</span></li>
          <li><span class="titre">Avatar :</span><span class="data"><img v-bind:src="user.photo || 'https://picsum.photos/300/200?random'" alt="image avatar" class="profil_detail__avatar"/></span></li>
          <li><span class="titre">Service :</span><span class="data">{{ user.service }}</span></li>
          <li><span class="titre">e-mail :</span><span class="data">{{ user.email }}</span></li>
          <li><span class="titre">Password :</span><span class="data"> ********** </span></li>
          <li v-if="user.isAdmin == 1"><span class="titre">Is Admin ?</span><span class="data">{{ user.isAdmin }}</span></li>
        </ul>
        <div class="boutons">
          <router-link to="/UpdateProfile" class="modify">Modifier ?</router-link>
          <button v-if="user.id == id" v-on:click="deleteProfil()" class="deleteUser" title="Effacer votre profil"><i class="far fa-trash-alt"></i></button>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Profil",
    props: {
    },
    data() {
      return {
        id:"",
        user: {
          pseudo: "",
          photo: "",
          service: "",
          email: "",
          password: "",
          id: ""
        },
      };
    },
    mounted : function() {
      this.getProfile();
    },
    methods: {
      getProfile() {
        axios
          .get(`auth/user/${this.id}`)
          .then(response => {
            let data = response.data;
            this.user = data[0];
            console.log(this.user);
          })
          .catch(error => {
            this.user = alert("erreur, pas de profil trouvé");
            console.log('pas bon' + error);
          });
      },
      updateProfile() {
        axios
          .put(`auth/update/${this.id}`, {
            pseudo: this.newPseudo,
            service: this.newService,
            email: this.newEmail,
            password: this.newPassword
          })
          .then(response => {
            let data = response.data;
            console.log(data);
            this.data = alert("l'ultilisateur" + data.pseudo + "a bien été ajouté");
          })
          .catch(error => {
            this.data = alert("erreur");
            console.log(error);
          });
      },
      deleteProfile() {
        axios.delete(`auth/delete/${this.id}`)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.data = alert("L'utilisateur a bien été supprimé !")
        })
        .catch(error => {
          this.data = alert("erreur, pas d'effacement !")
          console.log(error);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
.profil{
  margin-top: 163px;
  background: #0e252ccc;
  width: 100%;
  .profil-container {
    margin: 2% auto;
    width: 80%;
  }
  h1{
    font-family: 'Orbitron', cursive;
    font-size: 1.5em;
    color: lightgrey;
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid lightgrey;
    border-radius: 30px;
    box-shadow: 0 2px 2px #1ed4add0;
  }
  &_detail {
    
    &_list {
      display: flex;
      flex-direction: column;
      li {
        margin: 10px;
        display: inline-flex;
        list-style: none;
        font-weight: bold;
        color: lightgrey;
        font-family: 'Indie Flower', cursive;
        justify-content: center;
        align-items: center;
        .titre {
          font-size: 1.5em;
          width: 40%;
          display: inline-flex;
          justify-content: flex-end;
          border-bottom: 2px solid lightgrey;
          border-radius: 0 0 0 30px;
          box-shadow: 0 2px 1px #1ed4add0;
        }
        .data {
          font-size: 1.2em;
          width: 60%;
          display: inline-flex;
          justify-content: center;
          border-top: 2px solid lightgrey;
          border-radius: 0 30px 0 0;
        }
        img {
          width: 100px;
          border-style: none;
          border-radius: 20px;
        }
      }
      &__avatar{
        max-width: 100px;
      }
    }
    .boutons{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 30%;
        .modify {
          display: block;
          position: relative;
          margin: 10px auto;
          padding: 5px 10px 8px 10px;
          text-decoration: none;
          background-color: #135a53;
          font-family: 'Indy Flower', cursive;
          color: lightgrey;
          font-size: 2em;
          border-style: none;
          box-shadow: 0 10px 10px #115a53bb;
          border-radius: 30px;
        }
        .modify:hover {
          top: 2px;
          color: gold;
          box-shadow: 0 8px 8px #115a53bb;
        }
        .modify:active {
          top: 8px;
          box-shadow: 0 2px 2px #115a53bb;
        }
        .deleteUser {
          display: block;
          position: relative;
          margin: 10px auto;
          padding: 6px 15px 8px 15px;
          text-decoration: none;
          background-color: #135a53;
          font-family: 'Indy Flower', cursive;
          color: lightgrey;
          font-size: 2em;
          border-style: none;
          box-shadow: 0 10px 10px #115a53bb;
          border-radius: 30px;
        }
        .deleteUser:hover {
          top: 2px;
          cursor: pointer;
          color: red;
          box-shadow: 0 8px 8px #115a53bb;
        }
        .deleteUser:active {
          top: 8px;
          color: red;
          box-shadow: 0 2px 2px #115a53bb;
        }
      }
    
  }
}
</style>
