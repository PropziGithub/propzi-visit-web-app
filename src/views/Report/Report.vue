<template>
  <!-- Report  -->
  <main class="container">
    <section class="table-section report" id="all-visits">
      <div class="header">
        <h3>Report</h3>
      </div>
      <hr style="border: 1px solid rgb(233, 233, 233); width: 100%" />
      <div class="row w-100 pt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4>Property Details</h4>
            </div>
            <div class="card-body" id="property-details">
              <div class="card-body text-center" v-if="property.length === 0">
                <div class="spinner-grow" role="status" id="propertyMessage">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div class="row" v-else>
                <div class="col-6" v-if="property !== {}">
                  <div class="card-title">
                    <strong>Area</strong>: <span>{{ property.area }}</span>
                  </div>
                  <div class="card-title">
                    <strong>City</strong>: <span>{{ property.city }}</span>
                  </div>
                  <div class="card-title">
                    <strong>Neighbourhood</strong>:
                    <span>{{ property.neighbourhood }}</span>
                  </div>
                  <div class="card-title">
                    <strong>Number Of Bathrooms</strong>:
                    <span>{{ property.numberOfBathrooms }}</span>
                  </div>
                  <div class="card-title">
                    <strong>Number Of Bedrooms</strong>:
                    <span>{{ property.numberOfBedrooms }}</span>
                  </div>
                </div>

                <div class="col-6" v-if="property !== {}">
                  <div class="card-title">
                    <strong>propertyClass</strong>:
                    <span>{{ property.propertyClass }}</span>
                  </div>
                  <div class="card-title">
                    <strong>squareFeet</strong>:
                    <span>{{ property.squareFeet }}</span>
                  </div>
                  <div class="card-title">
                    <strong>streetName</strong>:
                    <span>{{ property.streetName }}</span>
                  </div>
                  <div class="card-title">
                    <strong>streetNumber</strong>:
                    <span>{{ property.streetNumber }}</span>
                  </div>
                  <div class="card-title">
                    <strong>unitNumber</strong>:
                    <span>{{ property.unitNumber }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4 id>
                Visit Report<span class="text-success" v-if="user.fullName">
                  - {{ user.fullName.toUpperCase() }}</span
                >
              </h4>
            </div>
            <div class="card-body" id="visit-report" v-if="report !== null">
              <div class="card-title">
                <strong>Representative</strong>:
                <span>{{ report.representative }}</span>
              </div>
              <div class="card-title">
                <strong>Next Visit</strong>:
                <span>{{ new Date(report.nextVisit).toDateString() }}</span>
              </div>
              <div class="card-title">
                <strong>Last Visit</strong>:
                <span>{{ report.lastVisit.toDate().toDateString() }}</span>
              </div>
              <div class="card-title">
                <strong>Insights</strong>:
                <span>{{ report.insights }}</span>
              </div>
              <div class="card-title">
                <strong>Description</strong>:
                <span>{{ report.description }}</span>
              </div>
              <div class="card-title mt-4">
                <button
                  onclick="window.print()"
                  class="btn btn-raised btn-sm btn-primary"
                >
                  Print Report
                </button>
              </div>
            </div>
            <div class="card-body text-center" id="visit-report" v-else>
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { database } from "../../firebase/firebaseConfig";

export default {
  name: "Report",
  data() {
    return {
      user: "",
      message: "",
      property: [],
      report: null,
    };
  },
  methods: {
    async showReport() {
      const doc = await database
        .collection("UserDetails")
        .doc(this.$route.params.userId)
        .get();
      if (doc.exists) {
        const paths = doc.ref.path;
        const collections = await database.doc(paths);
        const propziVisitCollection = collections.collection("PropziVisit");
        const propertyCollection = collections.collection("Property");
        const userCollection = collections.collection("User");

        propziVisitCollection
          .doc(this.$route.params.visitId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.report = doc.data();
            } else {
              this.message = "There was no report found";
            }
          })
          .catch((err) => {
            console.log(err.message);
          });

        userCollection
          .where("userId", "==", this.$route.params.userId)
          .get()
          .then((doc) => {
            if (doc.docs[0].data()) {
              this.user = doc.docs[0].data();
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        this.message = "There was no report found";
      }
    },

    // Get and Show property details
    async showProperty() {
      const doc = await database
        .collection("UserDetails")
        .doc(this.$route.params.userId)
        .get();
      if (doc.exists) {
        const paths = doc.ref.path;
        const collections = await database.doc(paths);
        const propertyCollection = collections.collection("Property");
        const userCollection = collections.collection("User");
        propertyCollection
          .doc(this.$route.params.propertyId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.property = doc.data();
            } else {
              this.message = "There was no property found";
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        this.message = "There was no property found";
      }
    },
    checkPropertyStatus() {
      let propertyInnerText = document.getElementById("propertyMessage");
      let span = propertyInnerText.querySelector("span");
      setTimeout(() => {
        span.textContent = "No Property was found";
      }, 6000);
    },
  },
  mounted() {
    this.showReport();
    this.showProperty();
    this.checkPropertyStatus();
  },
};
</script>

<style></style>
