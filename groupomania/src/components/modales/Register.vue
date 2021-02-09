<template>
    <div class="register-container">
        <div class="overlay"></div>
        <div class="modale card">
            <form @submit.prevent="register()" class="form">
                <label for="pseudo">Choisissez un Pseudo</label>
                <input
                    v-model="form.pseudo"
                    required= true
                    type="text" 
                    class="pseudo"
                    placeholder="Renseignez ici votre Pseudo :"
                    pattern="[a-zA-ZÀ-ÿ]{1,64}"
                />
                <label for="service">Service :</label>
                <input
                    type="text"
                    class="service"
                    placeholder="Renseignez ici votre service :"
                    v-model="form.service"
                    pattern="[a-zA-ZÀ-ÿ]{1,30}"
                />
                <label for="email">Renseignez votre adresse email</label>
                <input
                    v-model="form.email"
                    type="text" 
                    class="email"
                    placeholder="Renseignez ici votre email :"
                    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}"
                />
                <label for="photo">Choisissez-vous un avatar</label>
                <input
                    v-model="form.photo"
                    placeholder="Saisissez l'url de votre avatar"
                    id="photo"
                    type="text"
                />
                <label for="password">Un mot de passe ici :</label>
                <input
                    v-model="form.password"
                    v-show-password-input
                    type="password" 
                    class="password"
                    placeholder="6 Caractères minimum avec une majuscule et un chiffre..."
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                />
                <button class="register-btn" type="submit">Envoyer !</button>
            </form>
        </div>
    </div>
</template>

<script>
//import { mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'Register',

    data() {
        return {
            form: {
                pseudo: "",
                email: "",
                photo: "",
                service: "",
                password: "",
                isAdmin: null
            }
        }
    },
    methods: {
        register () {
            axios.post('http://localhost:3000/api/auth/register/', this.form)
            .then(response => {
                let data = response.data;
                console.log(data);
                this.data = alert(
                "l'ultilisateur " + data.pseudo + " a bien été ajouté !"
                );
                this.$router.replace({
                    name: 'Login'
                })
                
            })
            .catch(error => {
                if (error.status(400)) {
                    alert('Mot de passe trop simple');
                    } else {
                        this.data = alert("tu t'es gourré gros !");
                        console.log(error);
                }
            })
        }
    }  
}
</script>

<style lang="scss" scoped>
.register-container {
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
        background-color: rgba(0, 0, 0, 0.8);
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
        top: 5%;
        width: 70%;
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
            .register-btn {
                background-color: $color2;
                color: $color6;
                border-radius: 50%;
            }
        }
    }
}
</style>