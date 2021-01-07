import { createRouter, createWebHistory } from "vue-router";
import PropziVisit from "../views/PropziVisit/PropziVisit.vue";
import Report from "../views/Report/Report.vue";
import Visit from "../views/Visit/Visit.vue";

const routes = [
  {
    path: "/",
    name: "propzi-visit",
    component: PropziVisit,
  },
  {
    path: "/booked-visit",
    name: "booked-visits",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/PropziVisit/BookedVisits.vue"
      ),
  },
  {
    path: "/visited-properties",
    name: "visited-properties",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/PropziVisit/VisitedProperties.vue"
      ),
  },
  {
    path: "/report/:userId/:visitId/:propertyId",
    name: "report",
    component: Report,
  },
  {
    path: "/visit/:userId/:bookedId",
    name: "visit",
    component: Visit,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
