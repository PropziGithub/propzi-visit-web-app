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
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-if="propziVisit.length <= 0">
                <td colspan="6">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr
                v-else
                class="text-center"
                v-for="visit in propziVisit"
                :key="visit.propertyId"
              >
                <th scope="row">{{ visit.propertyId }}</th>
                <td v-if="visit.representive">{{ visit.representive }}</td>
                <td v-else>-</td>
                <td
                  :class="
                    visit.status === 'pending'
                      ? 'badge badge-warning'
                      : 'badge badge-success'
                  "
                  class="p-2 mt-2"
                >
                  {{ visit.status }}
                </td>
                <td v-if="visit.nextVisit">{{ visit.nextVisit }}</td>
                <td v-else>-</td>
                <td v-if="visit.lastVisit">{{ visit.lastVisit }}</td>
                <td v-else>-</td>
                <td>
                  <!-- <router-link
                    :to="{
                      name: 'visit',
                      params: {
                        propertyId: visit.propertyId,
                        userId: visit.userId,
                      },
                    }"
                    v-if="visit.status === 'Pending'"
                    class="btn-raised btn-sm btn btn-info"
                  >
                    Visit now
                  </router-link>
                  <router-link
                    :to="{
                      name: 'report',
                      params: {
                        propertyId: visit.propertyId,
                        userId: visit.userId,
                      },
                    }"
                    v-else-if="visit.status === 'Visited'"
                    class="btn-raised btn-sm btn btn-success"
                  >
                    See report
                  </router-link> -->
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
      visitedProperties: null,
      propziVisit: [],
    };
  },
  
};
</script>
