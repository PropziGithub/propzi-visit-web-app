<template>
  <nav id="change-tab">
    <ul class="nav nav-tabs bg-light justify-content-center inner-nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          All Visits
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/registered-visits" class="nav-link">
          Registered visits
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="visited-properties" class="nav-link">
          Visited Properties
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
