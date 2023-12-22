<template>
  <div class="q-pa-md row items-start q-gutter-md forgot-page bg-indigo-1">
    <q-card class="my-card">
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
  // Check if email is null or empty
  if (!email.value) {
    $q.notify({
      message: "Please enter email",
      color: "red",
      type: "negative",
    });
    return; 
  }

  // Add your logic for handling the forgot password submission
  try {
    const response = await instance.post("/forget-password/", {
      email: email.value,
    });

    if (response.data.status === "Success") {
      $q.notify({
        message: "Password sent successfully! Please check your email",
        color: "green",
        type: "positive",
      });
      // Handle success as needed
    } else {
      // Provide more specific feedback to the user
      if (response.data.error) {
        $q.notify({
          message: response.data.error,
          color: "red",
          type: "negative",
        });
      } else {
        $q.notify({
          message: "Please check your credentials!",
          color: "red",
          type: "negative",
        });
      }
    }
  } catch (error) {
    // Handle different types of errors
    console.error("Forgot password error:", error.message);
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
  background-size: cover;
  background-position: center;
  height: 80vh; /* Set height to 100% of the viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh + 2.7vh);
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
