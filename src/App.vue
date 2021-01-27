<template>
  <div id="nav" v-if="showNav">
    <NavBarAll />
  </div>
  <router-view />
</template>

<script>
import NavBarAll from "./components/NavBarAll";

export default {
  name: "App",
  components: {
    NavBarAll,
  },
  data() {
    return {
      showNav:true
    };
  },
  mounted(){
    if(location.pathname === '/login'){
      this.showNav = false
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

.body {
  font-family: Roboto;
}
.table-section {
  display: none;
  justify-content: center;
  align-items: center;

  height: 70vh;
}

.inner-nav li a {
  padding: 0.8rem 0.5rem !important;
  text-transform: initial;
  font-weight: 600;
}

.activated {
  display: flex;
}
.report {
  display: flex;
  flex-direction: column;
  margin-top: 3em;
}

h1,
h2,
h3,
h4 {
  margin-bottom: 0 !important;
}

select option {
  font-size: 14px !important;
}
/* .is-filled{
  height: 0;
} */

.table th,
.table td {
  vertical-align: 0 !important;
}

@media (min-width: 768px) {
  .card {
    width: 100% !important;
  }
  .form-visit {
    width: 80%;
  }
}
@media (min-width: 1224px) {
  .form-visit {
    width: 45%;
  }
}
@media (min-width: 568px) {
  .card {
    width: 100% !important;
  }
}
</style>
