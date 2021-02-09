<template>
  <div class="login_container">
      <div class="overlay"></div>
      <div class="modale card">
        <form @submit.prevent="submit" class="form">
            <label for="email">Renseignez ici votre email :</label>
            <input
                v-model="form.email"
                type="text" 
                class="email"
                placeholder="toto@titi.fr"
            />
            <label for="password">Renseignez ici votre Mot de passe :</label>
            <input
                v-model="form.password"
                v-show-password-input
                type="password" 
                class="password"
                placeholder="..."
            />
            <button class="login-btn" type="submit">Envoyer !</button>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions({
            signin: 'auth/login'
        }),
        submit () {
            this.signin(this.form)
            .then(() => {
                this.$router.replace({
                    name: 'Home'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .overlay {
        background-color: rgba(0,0,0,0.6);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .modale {
        background-color: #f1f1f1;
        color: $color1;
        padding: 20px;
        top: 10%;
        width: 300px;
        border: 1px solid $color1;
        box-shadow: 5px 5px 8px $shad1;
        .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            label {
                display: inline-flex;
                font-family: $font2;
                font-size: 1em;
                color: $color1;
                border-bottom: 1px solid $color4;
                width: 90%;
                justify-content: center;
                align-content: center;
            }
            input {
                display: inline-flex;
                justify-content: center;
                font-family: $font1;
                font-size: 0.8em;
                border: none;
                width: 100%;
            }
            .login-btn {
                background-color: $color2;
                color: $color6;
                border-radius: 50%;
            }
        }
    }
}
</style>