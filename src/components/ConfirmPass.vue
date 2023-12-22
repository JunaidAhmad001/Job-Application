<template>
  <div class="q-pa-md row items-start q-gutter-md forgot-page">
    <q-card class="inset-shadow-down">
      <q-card-section class="bg-white text-black text-center">
        <div class="text-h6">Set Password</div>
      </q-card-section>
      <form @submit.prevent="setPassword" class="bg-white">
        <q-input
          bottom-slots
          v-model="password"
          label="Enter Password"
          counter
          class="q-mb-md"
          style="width: 100%"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
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
          :type="showConfirmPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="text-indigo q-ml-md"
              @click="toggleConfirmPasswordVisibility"
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
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const password = ref("");
const confirmPassword = ref("");
const passwordMismatch = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
const setPassword = async () => {
  // console.log(route.params.email);
  if (password.value !== confirmPassword.value) {
    passwordMismatch.value = $q.notify({
      message: "Please verify confirm password.",
      color: "red",
      type: "warning",
    });
  } else if (
    password.value === null ||
    confirmPassword.value === null ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    $q.notify({
      message: "Please fill all the fields.",
      color: "red",
      type: "warning",
    });
  } else {
    passwordMismatch.value = ""; // Clear the error message
    // console.log("Password set successfully");

    try {
      const response = await instance.post(
        `/setPassword/${route.params.email}`,
        {
          // email: route.params.email,
          password: password.value,
          confirmPassword: confirmPassword.value,
        }
      );
      // console.log('Response Data:', response.data[0].token);

      if (response.data.status=='Success') {
        
        $q.notify({
          message: "Password set succesfully!",
          color: "blue",
          type: "green",
        });
        router.push('/');
        // Check if the response indicates success, but not necessarily if credentials are correct
        // const token = response.data.token;
        // const token = response.data.data.token;
        // console.log(token);
        // store.setToken(token);
      } else {
        // Provide more specific feedback to the user
        if (response && response.data.error) {
          // console.error("Login failed:", response.data.error);
          $q.notify({
            message: response.data.error,
            color: "red",
            type: "negative",
          });
        } else {
          
             $q.notify({
          message: "Invalid Credentials!",
          color: "red",
          type: "negative",
        });
        }

     
      }
    } catch (error) {
      // Handle different types of errors
      console.error("Login failed:", error.message);
      $q.notify({
        message: "Invalid Credentials!",
        color: "red",
        type: "negative",
      });
    }
  }
};
</script>

<style scoped>
.forgot-page {
  background-size: cover;
  background-position: center;
  height: 80vh; /* Set height to 100% of the viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
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
