<template>
  <q-page class="q-pa-md flex justify-center items-center">
    <div class="form-container">
      <h1 class="text-center">Prijava</h1>
      <p class="text-center">Unesite svoje korisničke podatke za prijavu.</p>
 
      <!-- Korisničko ime ili Email -->
      <q-input
        v-model="username"
        label="Korisničko ime"
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Korisničko ime je obavezno',
        ]"
        lazy-rules
        class="q-mb-md"
      />
 
      <!-- Lozinka -->
      <q-input
        v-model="password"
        label="Lozinka"
        type="password"
        :rules="[(val) => (val && val.length > 0) || 'Lozinka je obavezna']"
        lazy-rules
        class="q-mb-md"
      />
 
      <!-- Potvrdi -->
      <q-btn
        label="Potvrdi"
        color="primary"
        @click="loginUser"
        class="full-width-btn"
      />
 
      <!-- Poruka o uspjehu -->
      <div v-if="loginSuccess" class="text-center text-green-500 mt-4">
        Prijava uspješna!
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
 
export default {
  data() {
    return {
      username: "",
      password: "",
      loginSuccess: false, // Za prikazivanje poruke o uspjehu
      user: JSON.parse(localStorage.getItem("user")) || null, //Dodano za prikaz korisničkog nadimka
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.user;
    },
    userNickname() {
      return this.user ? this.user.korime : "";
    },
  },
  methods: {
    async loginUser() {
      if (this.username && this.password) {
        const loginData = {
          username: this.username,
          password: this.password,
        };
 
        try {
          const response = await axios.post(
            "http://localhost:3000/api/login",
            loginData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
 
          console.log("Prijava uspješna:", response.data);
 
          if (response.data.user) {
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            this.user = user; //Dodano - sprema korisnika za prikaz nadimka
 
            this.$router.push(user.role === "admin" ? "/pocetna" : "/O_nama");
          } else {
            alert("Neispravni podaci za prijavu!");
          }
        } catch (error) {
          console.error("Greška pri prijavi:", error);
          alert(error.response?.data?.message || "Greška na serveru.");
        }
      } else {
        alert("Molimo unesite korisničko ime i lozinku.");
      }
    },
    logoutUser() {
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>