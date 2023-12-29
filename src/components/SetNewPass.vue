<template>
  <div class="q-pa-md row items-start q-gutter-md set-password bg-indigo-1">
    <q-card class="inset-shadow-down my-card">
      <q-card-section class="bg-white text-indigo text-center">
        <div class="text-h6">Set New Password</div>
      </q-card-section>
      <form @submit.prevent="setPassword" class="bg-white">
        <q-input
          bottom-slots
          v-model="oldPassword"
          label="Enter Old Password"
          counter
          class="q-mb-md"
          style="width: 100%"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon
              name="password"
              class="text-indigo q-ml-md"
              @click="togglePasswordVisibility"
            />
          </template>
        </q-input>
        <q-input
          bottom-slots
          v-model="password"
          label="Enter New Password"
          counter
          class="q-mb-md"
          style="width: 100%"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon
              name="password"
              class="text-indigo q-ml-md"
              @click="togglePasswordVisibility"
            />
          </template>
        </q-input>
        <q-input
          bottom-slots
          v-model="confirmPassword"
          label="Confirm Password"
          counter
          class="q-mb-md"
          style="width: 100%"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon
              name="password"
              class="text-indigo q-ml-md"
              @click="togglePasswordVisibility"
            />
          </template>
        </q-input>
        <!-- <q-field-error v-if="passwordMismatch">{{ passwordMismatch }}</q-field-error> -->
        <q-btn
          label="Submit"
          :lowercase="true"
          type="submit"
          color="indigo"
          class="q-mt-md q-mb-md text-capitalize"
        />
      </form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import instance from "../helper/http-config";
import { useAppStore } from "../store/index";
// import { useRoute } from 'vue-router';

const store = useAppStore();

const oldPassword = ref("");
const confirmPassword = ref("");
const password = ref("");
const showPassword = ref(false);
const $q = useQuasar();
// const route = useRoute();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
const resetForm = () => {
  oldPassword.value = ref("");
  confirmPassword.value = ref("");
  password.value = ref("");
};
const setPassword = async () => {
  if (confirmPassword.value !== password.value) {
    $q.notify({
      message: "Please verify confirm password.",
      color: "red",
      type: "warning",
    });
  } else if (
    oldPassword.value === null ||
    confirmPassword.value === null ||
    password.value === null
  ) {
    $q.notify({
      message: "Please fill all the fields.",
      color: "red",
      type: "warning",
    });
  } else {
    const token = store.getToken();
    try {
      const response = await instance.post(
        `/change-password`,
        {
          oldPassword: oldPassword.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "Success") {
        $q.notify({
          message: "Password set successfully!",
          color: "blue",
          type: "positive",
        });
        resetForm();
      } else {
        if (response && response.data.error) {
          $q.notify({
            message: response.data.error,
            color: "red",
            type: "negative",
          });
        } else {
          console.error(
            "Password setting failed. Please check your credentials."
          );
        }
      }
    } catch (error) {
      $q.notify({
        message: "Password setting failed. Please try again.",
        color: "red",
        type: "negative",
      });
    }
  }
};
</script>

<style scoped>
.set-password {
  background-size: cover;
  background-position: center;
  height: 80vh; /* Set height to 100% of the viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: calc(100vh + 2.7vh); */
}
.my-card {
  max-width: 400px; /* Set a maximum width for larger screens */
  width: 100%;
  margin: auto; /* Center the card horizontally */
}

@media (max-width: 599px) {
  .my-card {
    max-width: 400px;
  }
}
</style>
