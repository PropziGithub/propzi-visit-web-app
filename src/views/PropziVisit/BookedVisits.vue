<template>
  <nav-bar-opt></nav-bar-opt>
  <main class="container">
    <!-- <div class="alert alert-success">
      <p>{{ message }}</p>
    </div> -->
    <section class="table-section activated" id="all-visits">
      <div class="card w-75">
        <div class="card-header">
          <h3>Booked Visits</h3>
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
              <tr class="text-center" v-if="bookedVisits.length <= 0">
                <td colspan="4">
                  <div
                    class="spinner-grow"
                    role="status"
                    id="booked-visits-loader"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <!-- <h5>No Data</h5> -->
                </td>
              </tr>
              <tr
                class="text-center"
                v-for="visit in bookedVisits"
                :key="visit.propertyId"
                v-else
              >
                <th scope="row">{{ visit.propertyId }}</th>
                <td
                  :class="
                    visit.visited === false
                      ? 'badge badge-warning'
                      : 'badge badge-success'
                  "
                  class="p-2"
                >
                  Pending
                </td>
                <td>{{ new Date(visit.dateBooked).toDateString() }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'visit',
                      params: {
                        bookedId: visit.bookedId,
                        userId: visit.userId,
                      },
                    }"
                    v-if="visit.visited === false"
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

export default {
  components: { NavBarOpt },
  name: "PropziVisit",
  data() {
    return {
      message: "",
      bookedVisits: [],
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
        const docs = await database.doc(paths);

        const userCollection = docs.collection("User");
        const userId = userCollection.parent.id;
        const propziVisitCollection = docs.collection("PropziVisit");

        // Get Pending Visits
        const bookedVisits = await propziVisitCollection
          .where("visited", "==", false)
          .get();

        // Check if Visit not empty
        if (!bookedVisits.empty) {
          bookedVisits.docs.forEach((propziVisit) => {
            return this.bookedVisits.push({
              ...propziVisit.data(),
              userId,
              bookedId: propziVisit.id,
            });
          });
        }
      });
    },

    checkTableStatus() {
      let propertyInnerText = document.getElementById("booked-visits-loader");
      let span = propertyInnerText.querySelector("span");
      setTimeout(() => {
        span.textContent = "No booked visits found";
      }, 6000);
    },
  },
  mounted() {
    this.getAllVisits();
    this.checkTableStatus();
  },
};
</script>
