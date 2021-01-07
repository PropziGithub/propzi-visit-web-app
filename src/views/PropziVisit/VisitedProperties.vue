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
              <tr class="text-center" v-if="visitedProperties.length <= 0">
                <td colspan="6">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <!-- <h5>No Data</h5> -->
                </td>
              </tr>
              <tr
                v-else
                class="text-center"
                v-for="visit in visitedProperties"
                :key="visit.propertyId"
              >
                <th scope="row">{{ visit.propertyId }}</th>
                <td>{{ visit.representive }}</td>
                <td
                  :class="
                    visit.status.toLowerCase() === 'pending'
                      ? 'badge badge-warning'
                      : 'badge badge-success'
                  "
                  class="p-2 mt-2"
                >
                  {{ visit.status }}
                </td>
                <td>{{ visit.nextVisit }}</td>
                <td>{{ visit.lastVisit }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'report',
                      params: { propertyId: visit.propertyId,userId:visit.userId },
                    }"
                    v-if="visit.status.toLowerCase() === 'visited'"
                    class="btn-raised btn-sm btn btn-success"
                  >
                    See Report
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
import { database } from "../../firebase/firebaseConfig";
import { handleErr } from "../../until";

export default {
  components: { NavBarOpt },
  name: "VisitedProperties",

  data() {
    return {
      visitedProperties: [],
    };
  },

  methods: {
    async getAllVisits() {
      const doc = await database.collection("UserDetails").get();
      if (doc.empty) {
        return;
      }
      doc.docs.forEach(async (doc) => {
        const paths = doc.ref.path;
        const collections = await database.doc(paths);

        const userCollection = collections.collection("User");
        const userId = userCollection.parent.id;
        const propziVisitCollection = collections.collection("PropziVisit");

        // Get Pending Visits
        const propziVisits = await propziVisitCollection
          .where("status", "==", "Visited")
          .get();

        // Check if Visit not empty
        if (!propziVisits.empty) {
          propziVisits.forEach((propziVisit) => {
            return this.visitedProperties.push({
              ...propziVisit.data(),
              userId,
            });
          });
        }
      });
    },
  },
  mounted() {
    // this.getRegisteredVisites();
    this.getAllVisits();
    console.log(12);
  },
};
</script>
