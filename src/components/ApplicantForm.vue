<template>
  <q-layout class="q-pa-sm">
    <q-page-container>
      <q-form @submit.prevent="submitForm" @reset="resetForm">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-item class="text-h6">Fill The following fields❗</q-item>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.userName"
              label="User Name"
              type="text"
              required
              placeholder="Enter your user name"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.email"
              label="Email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.qualification"
              label="Qualification"
              type="text"
              required
              placeholder="Enter your qualification"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.cnic"
              label="CNIC"
              type="number"
              required
              placeholder="Enter your CNIC"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.address"
              label="Address"
              type="text"
              required
              placeholder="Enter your address"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.phoneNumber"
              label="Phone Number"
              type="tel"
              required
              placeholder="Enter your phone number"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="user.age"
              label="Age"
              type="number"
              :min="3"
              :max="125"
              required
              placeholder="Enter your age"
            />
          </q-card-section>

          <q-card-section>
            <q-file v-model="user.cv" label="CV (PDF only)" />
            <q-field-error v-if="cvError">{{ cvError }}</q-field-error>
          </q-card-section>

          <q-card-section>
            <q-btn
              color="primary"
              type="submit"
              :disable="loading"
              label="Submit"
              v-if="!loading"
            >
              <template v-slot:loading>
                <q-spinner />
              </template>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-form>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-pa-md {
  padding: 20px;
}

.q-mb-md {
  margin-bottom: 20px;
}

.card {
  max-width: 400px;
  margin: 0 auto;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import instance from "../helper/http-config";
// import axios from "axios";
// import { useAppStore } from "../store/index";
// import axios from "axios";

// const store = useAppStore();
const $q = useQuasar();
const cvError = ref(null);
const user = ref({
  userName: "",
  email: "",
  qualification: "",
  cnic: "",
  address: "",
  phoneNumber: "",
  age: null,
  cv: null,
});

const submitForm = async () => {
  // Check if any required field is empty
  if (
    user.value.userName === "" ||
    user.value.email === "" ||
    user.value.qualification === "" ||
    user.value.cnic === "" ||
    user.value.address === "" ||
    user.value.phoneNumber === "" ||
    user.value.age === "" ||
    user.value.cv === ""
  ) {
    alert("Enter all credentials");
  } else if (!isValidEmail(user.value.email)) {
    alert("Enter a valid email address");
  } else if (!isValidAge(user.value.age)) {
    alert("Enter a valid age (1 or 2 digits)");
  } else if (!user.value.cv) {
    cvError.value = "CV is required"; // Set CV error if it's not provided
  } else {
    // Clear CV error if it was previously set
    cvError.value = null;

    // Perform the rest of the form submission logic
    // http://192.168.11.172:3000/submit-form
    //    const isSubmitted = store.addUser({
    //   id: generateUniqueId(),
    //   userName: user.value.userName,
    //   email: user.value.email,
    //   qualification: user.value.qualification,
    //   cnic: user.value.cnic,
    //   address: user.value.address,
    //   phoneNumber: user.value.phoneNumber,
    //   age: user.value.age,
    //   cv: user.value.cv,
    // });
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("userName", user.value.userName);
    formData.append("email", user.value.email);
    formData.append("qualification", user.value.qualification);
    formData.append("cnic", user.value.cnic);
    formData.append("address", user.value.address);
    formData.append("phoneNumber", user.value.phoneNumber);
    formData.append("age", user.value.age);
    formData.append("cv", user.value.cv);
    try {
      // Use axios or fetch to send the FormData to the backend
      const response = await instance.post("/submit-form", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "Success") {
        $q.notify({
          message: "Data saved successfully!",
          color: "green",
          type: "green",
        });
      } else {
        $q.notify({
          message: response.error.error,
          color: "red",
          type: "negative",
        });
      }

      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors if the submission fails
      $q.notify({
        message: "Error submitting form. Please try again later.",
        color: "red",
        type: "negative",
      });
    }
  }
};

//      const response=await instance.post("/submit-form",{
//       userName: user.value.userName,
//       email: user.value.email,
//       qualification: user.value.qualification,
//       cnic: user.value.cnic,
//       address: user.value.address,
//       phoneNumber: user.value.phoneNumber,
//       age: user.value.age,
//       cv: user.value.cv,
//      })
//      if(response.data.status=='Success'){
//       $q.notify({
//       message: "Data saved sucessfully!.",
//       color: "green",
//       type: "green",
//     });
//      }
//      else{
//      $q.notify({
//       message: response.error.error,
//       color: "red",
//       type: "negative",
//     });
//      }

//     // const isSubmitted = store.addUser({
//     //   id: generateUniqueId(),
//     //   userName: user.value.userName,
//     //   email: user.value.email,
//     //   qualification: user.value.qualification,
//     //   cnic: user.value.cnic,
//     //   address: user.value.address,
//     //   phoneNumber: user.value.phoneNumber,
//     //   age: user.value.age,
//     //   cv: user.value.cv,
//     // });

//     // if (isSubmitted) {
//     //   $q.notify({
//     //     message: "User added successfully",
//     //     color: "purple",
//     //     type: "positive",
//     //   });
//     //   resetForm();
//     // }
//   }
// };
// let idCounter = 0;
// const generateUniqueId = () => {
//   idCounter += 1;
//   return idCounter;
// };
const resetForm = () => {
  // Reset form fields and state
  user.value = {
    userName: "",
    email: "",
    qualification: "",
    cnic: "",
    address: "",
    phoneNumber: "",
    age: null,
    cv: null,
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidAge = (age) => {
  const ageRegex = /^\d{1,2}$/;
  return ageRegex.test(age);
};
</script>
