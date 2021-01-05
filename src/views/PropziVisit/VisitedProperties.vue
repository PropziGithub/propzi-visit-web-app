<template>
  <!-- All Visits  -->
  <nav-bar-opt></nav-bar-opt>
  <div class="container">
    <section class="table-section activated" id="all-visits">
      <div class="card w-75">
        <div class="card-header">
          <h3>Visited Properties</h3>
        </div>
        <div class="table-responsive">
          <table class="table table-striped" id="table-data">
            <thead>
              <tr class="text-center">
                <th scope="col">Property ID</th>
                <th scope="col">Representive</th>
                <th scope="col">Visit Status</th>
                <th scope="col">Next Visit</th>
                <th scope="col">Last Visit</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="visit in visitedProperties"
                :key="visit.propertyID"
              >
                <th scope="row">{{ visit.propertyID }}</th>
                <td>{{ visit.representive }}</td>
                <td
                  :class="
                    visit.status.toLowerCase() === 'pending'
                      ? 'badge badge-warning'
                      : 'badge badge-success'
                  "
                  class="p-2 mt-3"
                >
                  {{ visit.status }}
                </td>
                <td>{{ visit.nextVisit }}</td>
                <td>{{ visit.lastVisit }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'visit',
                      params: { propertyId: visit.propertyID },
                    }"
                    v-if="visit.status.toLowerCase() === 'pending'"
                    class="btn-raised btn-sm btn btn-info"
                  >
                    Visit now
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBarOpt from "../../components/NavBarOpt.vue";
export default {
  components: { NavBarOpt },
  name: "VisitedProperties",

  data() {
    return {
      visitedProperties: null,
      propziVisit: [
        {
          propertyID: "mkan23sda23ds2a",
          representive: "Patrick kabwe",
          status: "Pending",
          nextVisit: "12/20/2021",
          lastVisit: "12/20/2020",
        },
        {
          propertyID: "mkan23sda23ds5a",
          representive: "Patrick kabwe",
          status: "Visited",
          nextVisit: "12/20/2021",
          lastVisit: "12/20/2020",
        },
        {
          propertyID: "mkan23sda231dsa",
          representive: "Patrick kabwe",
          status: "Visited",
          nextVisit: "12/20/2021",
          lastVisit: "12/20/2020",
        },
        {
          propertyID: "mkan23sda23ds4a",
          representive: "Patrick kabwe",
          status: "Visited",
          nextVisit: "12/20/2021",
          lastVisit: "12/20/2020",
        },
      ],
    };
  },

  methods: {
    getVisitedProperties() {
      const visits = this.propziVisit.filter((visit) => {
        return visit.status.toLowerCase() !== "visited";
      });
      this.visitedProperties = visits;
      console.log(visits);
    },
  },
  mounted() {
    this.getVisitedProperties();
  },
};
</script>
