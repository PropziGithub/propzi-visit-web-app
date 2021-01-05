<template>
  <main class="container">
    <!-- Report  -->
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
                    readonly
                    v-model="formData.propertyid"
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
export default {
  name: "Visits-Now",
  data() {
    return {
      property: {},
      formData: {
        property: "",
        representative: "",
        repRole: "",
        propziImpact: "",
        insight: "",
        description: "",
      },

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
    getProperty() {
      const arr = this.reportDetails.filter((property) => {
        return property.propertyID === this.$route.params.propertyId;
      });
      this.property = arr[0];
      console.log(this.property);
    },
    submitformData() {
      console.log(this.formData)
    },
  },
  mounted() {
    this.getProperty();
  },
};
</script>

<style></style>
