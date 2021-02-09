<template>
  <div id="nav">
    <b-navbar class="nav" type="dark" toggleable="md">
      <router-link to="/">
        <img src="../assets/images/icon-left-font-monochrome-black.svg" alt="logo de l'entreprise">
      </router-link>
      <div class="nav_menu">
        <b-nav-item class="item">
          <router-link to="/">
            <b-icon-house-door class="icone"/>
            <span class="texte">Accueil</span>
          </router-link>
        </b-nav-item>

        <b-navbar-toggle class="btn" target="nav-collapse">
          <b-icon-menu-down class="icone"/>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" class="nav-collapse" is-nav>
          <b-navbar-nav class="item-group">
            <template class="template-items" v-if="authenticated">
              <!-- Affiché quand l'utilisateur est connecté -->
              <b-nav-item class="item">
                <img v-bind:src="user.photo || 'https://picsum.photos/300/200?random'" alt="photo de profile" />
                <p class="texte">{{ user.pseudo }}</p>
              </b-nav-item>
              <b-nav-item class="item">
                <router-link to="/Profile">
                  <b-icon-person class="icone"/>
                  <p class="texte">Profile</p>
                </router-link>
              </b-nav-item>
              <b-nav-item class="item">
                <b-icon-box-arrow-right class="icone"/>
                <button v-on:click="logOut()" id="logout" class="logout">Déconnecter</button>
              </b-nav-item>
            </template>
            <template class="template-items" v-else>
              <!-- Affiché si l'utilisateur n'est pas connu -->
              <div class="box">
                <b-nav-item class="item">
                  <router-link to="/Register">
                    <b-icon-person-plus-fill class="icone" />
                    <p class="texte">Inscription</p>
                  </router-link>
                </b-nav-item>
              </div>
              <div class="box">
                <b-nav-item class="item">
                  <router-link to="/Login">
                    <b-icon-box-arrow-in-right class="icone" />
                    <p class="texte">Login</p>
                  </router-link>
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
      revele: false,
      open: false
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
    
    a {
      display: inline-flex;
      justify-content: center;
      text-decoration: none;
      width: 60%;
      height: 5vh;
      @media screen and (min-width: 450px) {
        height: 8vh;
      }
      @media screen and (min-width: 1024px) {
        height: 20vh;
        max-width: 100%;
      }
      img {
        display: block;
        max-width: 100%;
        max-height: 90%;
        margin: 0 2% 2% 0;
      }
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
      }
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
        .item-group {
          .template-items {
            .box {
              .item {
                color: $color6;
                a {
                  display: flex;
                  flex-direction: column;
                  text-decoration: none;
                  color: $color6;
                  text-decoration: none;
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
              }
            }
          }
        }
      }
    }
  }
  
}
</style>