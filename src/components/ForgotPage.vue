<template>
  <div class="q-pa-md row items-start q-gutter-md forgot-page">
    <q-card>
      <q-card-section class="bg-white text-indigo text-center">
        <div class="text-h6 text-bold">Forgot password</div>
      </q-card-section>

      <form @submit.prevent="forgotPassword" class="bg-white">
        <q-input
          bottom-slots
          v-model="email"
          label="Enter Email"
          counter
          :dense="dense"
          class="q-mb-md"
          style="width: 100%"
        >
          <template v-slot:prepend>
            <q-icon name="email" class="text-indigo q-ml-md" />
          </template>
        </q-input>

        <q-btn
          label="Submit"
          type="submit"
          color="indigo"
          class="q-mt-md q-mb-md text-capitalize"
        />
      </form>
    </q-card>
  </div>
</template>

<script setup>
// import axios from "axios";
import instance from "../helper/http-config";
import { ref } from "vue";
import { useQuasar } from "quasar";
// import { useRoute } from "vue-router";

// const route=useRoute();
const $q = useQuasar();
const email = ref("");
const dense = ref(true);

const forgotPassword = async () => {
  // Add your logic for handling the forgot password submission
  // http://192.168.11.172:3000/user/forget-password/
  try {
    const response = await instance.post("/forget-password/", {
      email: email.value,
    });
    // console.log('Response Data:', response.data[0].token);

    if (response.body.status) {
      $q.notify({
        message: "New password set succesfully!",
        color: "blue",
        type: "green",
      });
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
        console.error("Login failed. Please check your credentials.");
      }

      $q.notify({
        message: "Invalid Credentials!",
        color: "red",
        type: "negative",
      });
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

  console.log("Forgot password submitted:", email.value);
};
</script>

<style scoped>
.forgot-page {
  /* background-image: url("@/assets/2314983.webp"); */
  background-size: cover;
  background-position: center;
  height: calc(100vh + 2.1vh);
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-card {
  width: 100%;
}

@media (min-width: 600px) {
  .my-card {
    max-width: 400px; /* Set a maximum width for larger screens */
    /* width: 100%; */
  }
}
@media (max-width: 599px) {
  .my-card {
    max-width: 400px;
    /* width: 100%; */
  }
}

form {
  display: flex;
  flex-direction: column;
}
</style>
