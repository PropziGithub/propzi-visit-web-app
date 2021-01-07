<template>
  <main class="container">
    <!-- Visit Now  -->
    <section class="table-section report" id="all-visits">
      <div class="header" style="margin-top: 9rem;">
        <h3>Visit Now!</h3>
      </div>
      <hr style="border: 1px solid rgb(233, 233, 233); width: 100%" />

      <div class="row mt-5 form-visit">
        <div class="col-12">
          <form @submit.prevent="submitformData">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="propertyID" class="bmd-label-floating"
                    >Property ID</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="propertyID"
                    :value="formData.propertyId"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="representative" class="bmd-label-floating"
                    >Representative</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="representative"
                    v-model="formData.representative"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleSelect1" class="bmd-label-floating"
                    >Role in propzi</label
                  >
                  <select
                    class="form-control"
                    id="exampleSelect1"
                    v-model="formData.repRole"
                  >
                    <option selected>Choose..</option>
                    <option>Representative</option>
                    <option>Regional Rep</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="propziImpact" class="bmd-label-floating"
                    >Propzi Impact</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="propziImpact"
                    v-model="formData.propziImpact"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="insights" class="bmd-label-floating"
                    >Insights</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="insights"
                    v-model="formData.insight"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="description" class="bmd-label-floating"
                    >Description</label
                  >
                  <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    v-model="formData.description"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button
                  type="submit"
                  class="btn mt-4 btn-sm btn-block btn-primary btn-raised"
                >
                  Visit Now
                  <span
                    class="material-icons"
                    style="font-size: 0.8rem; font-weight: bolder"
                  >
                    call_made</span
                  >
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { database } from "../../firebase/firebaseConfig";

export default {
  name: "Visits-Now",
  data() {
    return {
      formData: {
        propertyId: this.$route.params.propertyId,
        representative: "",
        repRole: "",
        propziImpact: "",
        insights: "",
        description: "",
      },
    };
  },
  methods: {
    async submitformData() {
      const doc = await database
        .collection("UserDetails")
        .doc(this.$route.params.userId)
        .get();
      if (doc.exists) {
        const paths = doc.ref.path;
        const collections = await database.doc(paths);
        const visitedProperty = collections
          .collection("PropziVisit")
          .doc("VisitedProperty");

        const visitedPropertyDoc = await database.doc(visitedProperty.path);
        const allvisitedProperty = visitedPropertyDoc.collection(
          this.$route.params.propertyId
        );
        const propertyCollection = collections.collection("Property");
        const userCollection = collections.collection("User");

        allvisitedProperty
          .get()
          .then((doc) => {
           console.log(doc.docs);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      // database.collection('UserDetails')
      console.log(this.formData);
    },
  },
  mounted() {
    this.submitformData();
  },
};
</script>

<style></style>
