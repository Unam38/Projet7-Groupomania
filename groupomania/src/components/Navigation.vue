<template>
  <div id="nav">
    <b-navbar class="nav" type="dark" toggleable="md">
      <img src="../assets/images/icon-left-font-monochrome-black.svg" alt="logo de l'entreprise">
      <div class="nav_menu">
        <b-nav-item class="item">
          <router-link to="/">
            <b-icon-house-door class="icone"/>
            <span class="texte">Accueil</span>
          </router-link>
        </b-nav-item>
        <div v-if="authenticated" class="item">
          <img v-bind:src="user[0].photo || 'https://picsum.photos/300/200?random'" class="avatar" alt="photo de profile" />
          <p class="pseudo">{{ user[0].pseudo }}</p>
        </div>
        <b-navbar-toggle class="btn" target="nav-collapse">
          <b-icon-menu-down class="icone"/>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" class="nav-collapse" is-nav>
          <b-navbar-nav class="item-group">
            <template class="template-items" v-if="authenticated">
              <!-- Affiché quand l'utilisateur est connecté -->
              <b-nav-item v-if="user[0].isAdmin === 1" to="/Administration" class="item">
                <b-icon-gear class="icone"/>
                <p class="texte">Admin</p>
              </b-nav-item>
              <b-nav-item to="/Profile" class="item">
                <b-icon-person class="icone"/>
                <p class="texte">Profile</p>
              </b-nav-item>
              <div class="item">
                <b-icon-box-arrow-right class="icone"/>
                <button v-on:click="logOut()" id="logout" class="logout">Déconnecter</button>
              </div>
            </template>
            <template class="template-items" v-else>
              <!-- Affiché si l'utilisateur n'est pas connu -->
              <div class="box">
                <b-nav-item class="item" to="/Register">
                  <b-icon-person-plus-fill class="icone" />
                  <p class="texte">Inscription</p>
                </b-nav-item>
              </div>
              <div class="box">
                <b-nav-item class="item" to="/Login">
                  <b-icon-box-arrow-in-right class="icone" />
                  <p class="texte">Login</p>
                </b-nav-item>
              </div>
            </template>
        </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isAdmin: false
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
#nav {
  width: 100%;
  .nav{
    background: linear-gradient(to top, $color1, $color2);
    border-radius: 0 0 40% 40%;
    box-shadow: 3px 3px 5px $shad1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    align-items: center;
    width: 100%;
    z-index: 10;
    @media screen and (min-width: 517px) {
      flex-direction: row;
    }
    img {
      display: block;
      max-width: 35%;
      margin: 0 2% 2% 0;
    }
    &_menu {
      display: flex;
      flex-direction: row;
      margin-right: 10%;
      @media screen and (min-width: 1024px) {
        margin-right: 15%;
      }
      .item {
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icone{
            margin-right: 5px;
            color: $color6;
            font-size: 1em;
            @media screen and (min-width: 1024px) {
              font-size: 1.5em;
            }
          }
          .texte {
            color: $color6;
            font-size: 1em;
            font-family: $font2;
            @media screen and (min-width: 1024px) {
              font-size: 1.5em;
            }
          }
        }
        .avatar {
          width: 50px;
          border-radius: 50%;
          padding: 2%;
        }
        .pseudo {
          font-size: 1em;
          font-family: $font2;
          color: lightgrey;
          @media screen and (min-width: 1024px) {
            font-size: 1.5em;
          }
        }
        .icone{
          margin-right: 5px;
          color: $color6;
          font-size: 1em;
          @media screen and (min-width: 1024px) {
            font-size: 1.5em;
          }
        }
        .logout {
          border-radius: 50%;
          padding: 2%;
          border: 1px solid $color6;
          font-family: $font2;
          color: $color6;
          background-color: $color2;
        }
      }
      // boutton toggle colapse
      .btn {
        border: none;
        position: fixed;
        top: 10px;
        right: 10px;
        .icone {
          font-size: 1.2em;
        }
      }
      .nav-collapse {
        position: relative;
        top: 8px;
      }
    }
  }
}
</style>