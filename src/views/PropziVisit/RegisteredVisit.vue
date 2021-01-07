<template>
  <nav-bar-opt></nav-bar-opt>
  <main class="container">
    <section class="table-section activated" id="all-visits">
      <div class="card w-75">
        <div class="card-header">
          <h3>Registered Visits</h3>
        </div>
        <div class="table-responsive">
          <table class="table table-striped" id="table-data">
            <thead>
              <tr class="text-center">
                <th scope="col">Property ID</th>
                <th scope="col">Visit Status</th>
                <th scope="col">Date Booked</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-if="registeredVisits.length <= 0">
                <td colspan="4">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <!-- <h5>No Data</h5> -->
                </td>
              </tr>
              <tr
                class="text-center"
                v-for="visit in registeredVisits"
                :key="visit.propertyId"
                v-else
              >
                <th scope="row">{{ visit.propertyId }}</th>
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
                <td>{{ visit.dateBooked.toDate().toLocaleString() }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'visit',
                      params: {
                        propertyId: visit.propertyId,
                        userId: visit.userId,
                      },
                    }"
                    v-if="visit.status.toLowerCase() === 'pending'"
                    class="btn-raised btn-sm btn btn-info"
                  >
                    Visit Now
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import NavBarOpt from "../../components/NavBarOpt.vue";
import { database } from "../../firebase/firebaseConfig";
import { handleErr } from "../../until";

export default {
  components: { NavBarOpt },
  name: "PropziVisit",
  data() {
    return {
      registeredVisits: [],
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
          .where("status", "==", "Pending")
          .get();

        // Check if Visit not empty
        if (!propziVisits.empty) {
          propziVisits.forEach((propziVisit) => {
            return this.registeredVisits.push({
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
