<template>
  <!-- All Visits  -->
  <NavBarOpt />
  <div class="container">
    <section class="table-section activated" id="all-visits">
      <div class="card w-75">
        <div class="card-header">
          <h3>All Visits</h3>
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
                <th scope="col">Booked Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-if="allVisits.length <= 0">
                <td colspan="6">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr
                v-else
                class="text-center"
                v-for="visit in allVisits"
                :key="visit.propertyId"
              >
                <th scope="row">{{ visit.propertyId }}</th>
                <td v-if="visit.representative">{{ visit.representative }}</td>
                <td v-else>-</td>
        
                <td
                  v-if="visit.visited"
                  :class="
                    visit.visited
                      ? 'badge badge-success'
                      : 'badge badge-warning'
                  "
                  class="p-2"
                >
                  See Report
                </td>
                <td
                  v-else
                  :class="
                    visit.visited
                      ? 'badge badge-success'
                      : 'badge badge-warning'
                  "
                  class="p-2"
                >
                  Pending
                </td>
                <td v-if="visit.nextVisit">
                  {{ new Date(visit.nextVisit).toDateString() }}
                </td>
                <td v-else>-</td>
                <td v-if="visit.lastVisit">
                  {{ visit.lastVisit.toDate().toDateString() }}
                </td>
                <td v-else>-</td>
                <td v-if="visit.dateBooked">
                  {{ new Date(visit.dateBooked).toDateString() }}
                </td>
                <td v-else>-</td>
                <td>
                  <router-link
                    :to="{
                      name: 'visit',
                      params: {
                        bookedId: visit.bookedId,
                        propertyId: visit.propertyId,
                        userId: visit.userId,
                      },
                    }"
                    v-if="!visit.visited"
                    class="btn-raised btn-sm btn btn-info"
                  >
                    Visit now
                  </router-link>
                  <router-link
                    :to="{
                      name: 'report',
                      params: {
                        visitId: visit.visitId,
                        propertyId: visit.propertyId,
                        userId: visit.userId,
                      },
                    }"
                    v-else-if="visit.visited"
                    class="btn-raised btn-sm btn btn-success"
                  >
                    See report
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
import NavBarOpt from "../../components/NavBarOpt";
import { database } from "../../firebase/firebaseConfig";
import { handleErr } from "../../until";

export default {
  name: "AllVisit",
  components: {
    NavBarOpt,
  },
  data() {
    return {
      allVisits: [],
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
        const bookedVisits = await propziVisitCollection.get();

        // Check if Visit not empty
        if (!bookedVisits.empty) {
          bookedVisits.docs.forEach((propziVisit) => {
            return this.allVisits.push({
              ...propziVisit.data(),
              userId,
              bookedId: propziVisit.id,
              visitId: propziVisit.id,
            });
          });
        }
      });
    },
  },
  mounted() {
    this.getAllVisits();
  },
};
</script>
