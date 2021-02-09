<template>
  <div class="modale-block">
    <div class="modale card">
      <h1 class="card-title">Modifiez vos données :</h1>
      <form action="" class="card-body profile">
        <div class="box">
          <label for="pseudo">Pseudo :</label>
          <input 
            type="text"
            v-bind:placeholder="user[0].pseudo"
            v-model="form.pseudo"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
            />
        </div>
        <div class="box">
          <label for="service">Service :</label>
          <input
            type="text"
            v-bind:placeholder="user[0].service"
            v-model="form.service"
            pattern="[a-zA-ZÀ-ÿ]{1,64}"
          />
        </div>
        <div class="box">
          <label for="email">E-mail :</label>
          <input
            type="text"
            v-bind:placeholder="user[0].email"
            v-model="form.email"
          />
        </div>
        <div class="box">
          <label for="photo">Photo :</label>
          <input
            type="text"
            v-bind:placeholder="user[0].photo"
            v-model="form.photo"
          />
        </div>
      </form>
      <button v-on:click="updateProfile()" class="modify">Modifier ?</button>
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
          photo: ""
        }
      }
    },
    mounted: function() {
      this.getUserInfos()
    },
    methods: {
      getUserInfos() {
        this.form.pseudo = this.user[0].pseudo;
        this.form.service = this.user[0].service;
        this.form.email = this.user[0].email;
        this.form.photo = this.user[0].photo;
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
    background-color: $color6;
    padding: 2%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 120px auto;
    .card-title {
      font-size: 1.5em;
      color: $color4;
    }
    .profile {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background-color: $color6;
      .box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 2px auto;
        border: 1px solid $color4;
        label {
          font-family: $font2;
          font-size: 1.2em;
          color: $color1;
        }
        input {
          background-color: transparent;
          border-style: none;
        }
      }
    }
    .modify {
      margin: 20px auto;
      border-radius: 30px;
      color: $color4;
      background-color: $color6;
      margin: 30px auto;
    }
  }
}
</style>
