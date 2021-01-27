<template>
  <main class="container">
    <div class="main-header text-center">
      <h1>
        WELCOME TO <span class="text-primary">PROPZI</span>
        <span class="text-warning">VISIT</span>
      </h1>
      <small>{{ message }}</small>
    </div>

    <section class="table-section activated" id="all-visits">
      <div class="card">
        <div class="card-header text-center">
          <h3>
            Login
          </h3>
        </div>

        <div class="card-body">
          <form id="Loginform" @submit.prevent="loginUser">
            <div class="col-md-12">
              <div class="form-group">
                <label for="emailAddress" class="bmd-label-floating"
                  >Email address</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="emailAddress"
                  v-model="email"
                />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for="password" class="bmd-label-floating"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>
            </div>

            <div class="col-md-12 text-center">
              <button
                type="submit"
                class="btn mt-4 py-2 btn-sm btn-warning btn-raised px-4 "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { auth } from "../../firebase/firebaseConfig";

export default {
  name: "PropziVisit",
  data() {
    return {
      message: "",
      email: "",
      password: "",
    };
  },

  methods: {
    loginUser() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((s) => {
          if (s.user) {
            this.message = "You have logged in successfully";
            this.$router.push("/");
          }
        })
        .catch((err) => (this.message = err.message));
    },
  },
  mounted() {
    if (auth.currentUser) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.container {
  height: 100vh !important;
}

.card {
  width: 30% !important;
  border-radius: 6px;
}

.main-header {
  margin-top: 8em;
}

input {
  padding: 10px !important;
  background: transparent !important;
  border-bottom: 1px solid rgb(202, 202, 202);
  border-radius: 5px;
  /* color: black !important; */
}
</style>
