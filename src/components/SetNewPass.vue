<template>
  <div class="q-pa-md row items-start q-gutter-md forgot-page">
    <q-card class="inset-shadow-down">
      <q-card-section class="bg-white text-black text-center">
        <div class="text-h6">Set Password</div>
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
          v-model="confirmPassword"
          label="Enter New Password"
          counter
          class="q-mb-md"
          style="width: 100%"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon
              name="Confirm New Password"
              class="text-indigo q-ml-md"
              @click="togglePasswordVisibility"
            />
          </template>
        </q-input>
        <q-input
          bottom-slots
          v-model="newConfirmPassword"
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
import { useRoute } from 'vue-router';

const password = ref("");
const oldPassword = ref("");
const confirmPassword = ref("");
const newConfirmPassword = ref("");
const showPassword = ref(false);
const $q = useQuasar();
const route = useRoute();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const setPassword = async () => {
  if (confirmPassword.value !== newConfirmPassword.value) {
    $q.notify({
      message: "Please verify confirm password.",
      color: "red",
      type: "warning",
    });
  } else if (
    oldPassword.value === null ||
    confirmPassword.value === null ||
    newConfirmPassword.value === null
  ) {
    $q.notify({
      message: "Please fill all the fields.",
      color: "red",
      type: "warning",
    });
  } else {
    try {
      const response = await instance.post(
        `/setPassword/${route.params.email}`,
        {
          password: password.value,
          confirmPassword: confirmPassword.value,
        }
      );

      if (response.body.status) {
        $q.notify({
          message: "Password set successfully!",
          color: "blue",
          type: "positive",
        });
      } else {
        if (response && response.data.error) {
          $q.notify({
            message: response.data.error,
            color: "red",
            type: "negative",
          });
        } else {
          console.error("Password setting failed. Please check your credentials.");
        }
      }
    } catch (error) {
      console.error("Password setting failed:", error.message);
      $q.notify({
        message: "Password setting failed. Please try again.",
        color: "red",
        type: "negative",
      });
    }
  }
};
</script>
