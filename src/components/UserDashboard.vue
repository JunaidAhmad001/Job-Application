<!-- AdminDashboard.vue -->
<template>
  <!-- SideBar for quasar -->
  <div class="q-lg">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 750px"
      class="shadow-2 rounded-borders"
    >
      <q-header class="bg-indigo-1">
        <q-toolbar>
          <q-btn
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
            class="text-black"
          />
          <q-avatar class="q-ml-lg">
            <img
              class="text-black"
              src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg"
            />
          </q-avatar>
          <q-toolbar-title class="text-black">Hi User</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            title="Set Passwoord"
            icon="person"
            @click="settingUser"
            class="text-black q-ml"
          />
          <q-btn
            flat
            round
            dense
            title="Logout"
            icon="logout"
            @click="logOut"
            class="text-black"
          />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500">
        <q-scroll-area class="fit bg-indigo-10 rounded-borders">
          <q-list padding class="menu-list bg-indigo-10 q-mt-lg">
            <q-item
              clickable
              v-ripple
              to="/UserDashboard/UserList"
              :active-class="'active-class'"
            >
              <q-item-section>
                <q-icon name="table" color="white" />
              </q-item-section>
              <q-item-section class="text-white"> Applicant UserList </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<style scoped>
.active-class {
  color: white;
}
.q-item {
  position: relative;
}

.q-item:hover::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%; /* Adjust the width as needed */
  height: 2px; /* Adjust the height as needed */
  background-color: #fff; /* Adjust the color as needed */
}

.active-class::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%; /* Adjust the width as needed */
  height: 2px; /* Adjust the height as needed */
  background-color: #fff; /* Adjust the color as needed */
}
.q-item {
  position: relative;
}
.q-hoverable {
  transition: background-color 0.3s ease; /* Add a transition for a smoother effect */
}
.q-hoverable:hover {
  background-color: rgb(28, 233, 226);
}
.q-item:hover::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%; /* Adjust the width as needed */
  height: 2px; /* Adjust the height as needed */
  background-color: rgb(255, 255, 255); /* Adjust the color as needed */
  border-radius: 2px round;
}

.active-class::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background-color: #fff;
}
</style>

<script>
import { computed } from "vue";
// import { useStore } from 'pinia'; // Assuming you are using Pinia for state management
import { useRouter } from "vue-router";
import { useAppStore } from "../store/index";
import { ref } from "vue";
export default {
  setup() {
    const router = useRouter();
    const store = useAppStore();
    const drawer = ref(false);
    const miniState = ref(false);
    // Use computed to define adminLoggedIn as a computed property
    const adminLoggedIn = computed(() => store.adminLoggedIn);

    // Use logOut method to dispatch the 'logoutAdmin' action and navigate to 'LoginPage'
    const logOut = () => {
      router.push("/");
    };
    const settingUser = () => {
      router.push("/UserDashboard/SetNewPass");
    };
    // Return the computed property and methods for use in the template
    return {
      adminLoggedIn,
      logOut,
      drawer,
      miniState,
      settingUser,
    };
  },
};
</script>
