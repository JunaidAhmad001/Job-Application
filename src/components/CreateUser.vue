<template>
  <div class="q-pa-md row items-start q-gutter-md forgot-page bg-indigo-1">
    <q-card class="my-card rounded borders">
      <q-card-section class="bg-white text-indigo text-center">
        <div class="text-h6 text-bold">Create User</div>
      </q-card-section>

      <form @submit.prevent="createUser" class="bg-white">
        <q-input
          bottom-slots
          v-model="user.firstName"
          label="First Name"
          :dense="dense"
          class="q-mb-md "
          
          style="width: 100%"
        >
          <template v-slot:prepend>
            <q-icon name="person" class="text-indigo q-ml-md" />
          </template>
        </q-input>
        <q-input
          bottom-slots
          v-model="user.lastName"
          label="Last Name"
          :dense="dense"
          class="q-mb-md"
          style="width: 100%"
        >
          <template v-slot:prepend>
            <q-icon name="person" class="text-indigo q-ml-md" />
          </template>
        </q-input>
        <q-input
          bottom-slots
          v-model="user.email"
          label="Enter Email"
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
import { ref } from "vue";
// import {useAppStore} from "../store/index";
// import axios from "axios";

import { useQuasar } from "quasar";
import { useAppStore } from "../store/index";
import instance from "@/helper/http-config";
// import { useRouter } from "vue-router";

const $q = useQuasar();
const store = useAppStore();
const dense = ref(false);
// const router=useRouter();
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
});

// ------------------ RestForm--------------
const resetForm = () => {
  // Reset form fields and state
  user.value = {
    firstName: "",
    lastName: "",
    email: "",
  };
};

// -----------------------CreateUser-----------------
const createUser =async () => {
  // Check if the admin is logged in
  // if (!store.adminLoggedIn) {
  //   console.error("Admin is not logged in.");
  //   return;
  // }

  // Check if any of the fields are empty
  if (
    user.value.firstName === "" ||
    user.value.lastName === "" ||
    user.value.email === ""
  ) {
    $q.notify({
      message: "Enter all credentials",
      color: "red",
      type: "negative",
    });
  }
   else if (!isValidEmail(user.value.email)) {
    // Check if the email is valid
    alert("Enter a valid email address");
  } else {
  // All fields are filled and the email is valid, proceed with creating the user
  const isCreated = store.createAdd({
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
  });
  const token=store.getToken()

  if (isCreated) {
  try {
    const response = await instance.post("/createUser", {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
    },
     {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    
    );


    console.log('Response:', response);
    console.log('Response Data:', response.data);
    // console.log('Response Data:', response.data[0].token);

    if (response.status) {
      // Check if the response indicates success, but not necessarily if credentials are correct
      // const token = response.data.token;
      const token = response.data.data.token;
      // console.log(token);
      store.setToken(token);

      
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









    $q.notify({
      message: "User added successfully",
      color: "purple",
      type: "positive",
    });
    resetForm();
  }
  }
};
// --------------------isValidEmail------------------------

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
