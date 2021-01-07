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
                    >Rep Name</label
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
                  <label for="exampleSelect1" class="bmd-label-floating p-0"
                    >Rep Role</label
                  >
                  <select
                    class="form-control"
                    id="exampleSelect1"
                    v-model="formData.repRole"
                  >
                    <option selected disabled>Choose..</option>
                    <option>Representative</option>
                    <option>Regional Rep</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="category" class="bmd-label-floating"
                    >Structure Category</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="formData.category"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
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

              <div class="col-md-6">
                <div class="form-group">
                  <!-- <label for="nextVisit" class="bmd-label-floating"
                    >Next Visit</label
                  > -->
                  <input
                    type="date"
                    class="form-control"
                    id="nextVisit"
                    v-model="formData.nextVisit"
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
                  class="btn mt-4 py-2 btn-sm btn-block btn-primary btn-raised"
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
import firebase from "firebase";

export default {
  name: "Visits-Now",

  data() {
    return {
      message: "",
      formData: {
        propertyId: this.$route.params.bookedId,
        representative: "",
        repRole: "",
        category: "",
        insights: "",
        description: "",
        nextVisit: "",
        lastVisit: firebase.firestore.Timestamp.now(),
        visited:true
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
        const propertyCollection = collections.collection("Property");
        const userCollection = collections.collection("User");

        collections
          .collection("PropziVisit")
          .doc(this.$route.params.bookedId)
          .update(this.formData)
          .then(() => {
            this.message = "Successfully added";
            this.$router.push("/?message=" + this.message);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      // database.collection('UserDetails')
      // console.log(this.formData);
    },
  },
  mounted() {
    console.log(document.querySelector(".is-filled"));
  },
};
</script>

<style></style>
