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
              <div class="row">
                <div
                  class="col-6"
                  v-for="property in properties"
                  :key="property.propertyID"
                >
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

                <div
                  class="col-6"
                  v-for="property in properties"
                  :key="property.propertyID"
                >
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
              <h4>Visit Report</h4>
            </div>
            <div class="card-body" id="visit-report">
              <div class="card-title">
                <strong>Respresentative</strong>: <span>Patrick kabwe</span>
              </div>
              <div class="card-title">
                <strong>Next Visit</strong>: <span>Toronto</span>
              </div>
              <div class="card-title">
                <strong>Last Visit</strong>: <span>Toronto</span>
              </div>
              <div class="card-title">
                <strong>Description</strong>:
                <span>The roof was neat and didnt have any cracks</span>
              </div>
              <div class="card-title mt-4">
                <a
                  href=""
                  onclick="window.print()"
                  class="btn btn-raised btn-sm btn-primary"
                  >Print Report</a
                >
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
      properties: [],
      propertyDetails: [
        {
          propertyID: "mkan23sda23ds2a",
          area: "Toronto",
          city: "Toronto",
          neighbourhood: "nill",
          numberOfBathrooms: "4",
          numberOfBedrooms: "1",
          propertyClass: "Condo",
          squareFeet: "2000",
          streetName: "makenis",
          streetNumber: "53",
          unitNumber: "126",
        },
        {
          propertyID: "mkan23sda23ds5a",
          area: "Makeni",
          city: "Lusaka",
          neighbourhood: "Makeni villa",
          numberOfBathrooms: "3",
          numberOfBedrooms: "1",
          propertyClass: "Residential",
          squareFeet: "2000",
          streetName: "Makeni sport",
          streetNumber: "324",
          unitNumber: "0",
        },
      ],
      reportDetails: [
        {
          propertyID: "mkan23sda23ds2a",
          respresentative: "Patrick Kabwe",
          nextVisit: "12/12/2020",
          lastVisit: "12/12/2020",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, amet molestias ratione eius minus vitae enim commodi fuga possimus, ea delectus esse ipsam vero recusandae accusamus quis blanditiis cumque qui.",
        },
        {
          propertyID: "mkan23sda23ds5a",
          respresentative: "Patrick Kabwe",
          nextVisit: "12/12/2020",
          lastVisit: "12/12/2020",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, amet molestias ratione eius minus vitae enim commodi fuga possimus, ea delectus esse ipsam vero recusandae accusamus quis blanditiis cumque qui.",
        },
      ],
    };
  },
  methods: {
    getReport() {
      const visits = this.propertyDetails.filter((visit) => {
        return visit.propertyID === this.$route.params.propertyId;
      });
      this.properties = visits;
      console.log(visits);
    },
  },
  mounted() {
    this.getReport();
    database
      .collection("UserDetails")
      .doc("UserID")
      .collection("Property")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  },
};
</script>

<style></style>
