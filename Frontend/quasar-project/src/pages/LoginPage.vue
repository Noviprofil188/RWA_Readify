<template>
  <q-page class="q-pa-md flex justify-center items-center">
    <div class="form-container">
      <h3 class="text-center">Prijava</h3>
      <p class="text-center">Unesite svoje korisničke podatke za prijavu.</p>

      <!-- Email -->
      <q-input
        v-model="email"
        label="Email"
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Email je obavezan',
        ]"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Lozinka -->
      <q-input
        v-model="lozinka"
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
      email: "", // Promijenjeno iz username u email
      lozinka: "", // Promijenjeno iz password u lozinka
      loginSuccess: false,
      user: JSON.parse(localStorage.getItem("user")) || null,
    };
  },
  methods: {
    async loginUser() {
      if (this.email && this.lozinka) {
        const loginData = {
          email: this.email, // Šaljemo email umjesto username
          lozinka: this.lozinka, // Šaljemo lozinku
        };

        console.log("Podaci za prijavu:", loginData); // Dodano za provjeru

        try {
          const response = await axios.post(
            "http://localhost:3000/api/login",
            loginData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log("Prijava uspješna:", response.data);

          if (response.data.success) {
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", user.role); // Spremi role u localStorage
            this.user = user; // Dodano - sprema korisnika za prikaz nadimka
            this.loginSuccess = true;

            // Preusmjeravanje na odgovarajuću stranicu ovisno o ulozi
            if (user.role === "admin") {
              this.$router.push("/admin"); // Preusmjeri admina na /admin
            } else {
              this.$router.push("/profil"); // Preusmjeri običnog korisnika na /profil
            }
          } else {
            alert("Neispravni podaci za prijavu!");
          }
        } catch (error) {
          console.error("Greška pri prijavi:", error);
          alert(error.response?.data?.message || "Greška na serveru.");
        }
      } else {
        alert("Molimo unesite email i lozinku.");
      }
    },
    logoutUser() {
      localStorage.removeItem("user");
      localStorage.removeItem("role"); // Ukloni role prilikom odjave
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #fff5eb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  max-width: 400px;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.q-input {
  margin-bottom: 20px;
}
</style>