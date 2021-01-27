<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light justify-content-center"
  >
    <router-link class="navbar-brand" to="/">
      <img src="../../public/assets/newlogocolours.webp" width="50" alt="" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="mx-auto"></div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <button
            class="nav-link btn btn-warning px-3 btn-raised"
            @click="logOutUser"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth } from "../firebase/firebaseConfig";

export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    logOutUser() {
      auth
        .signOut()
        .then(() => {
          this.$router.push("/login");
          console.log("yes");
        })
        .catch((err) => console.log(err.message));
    },
  },
  // mounted(){
  //   if(auth.currentUser===null){
  //     this.$router.push("/login");
  //   } else{
  //     this.$router.push("/");
  //   }
  // }
};
</script>
