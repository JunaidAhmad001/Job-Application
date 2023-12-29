<template>
  <div class="q-pa-md row items-start q-gutter-md login-page bg-grey-13">
    <!-- Image on the left -->
    <!-- <q-avatar class="q-ml-lg hidden-md-down">
      <img class="login-image" src="../assets/login.png"/>
      
    </q-avatar> -->
    <q-card
      class="my-card rounded-borders bg-white inset-shadow-down"
      style="q-transparent"
    >
      <q-card-section class="bg-white text-indigo">
        <div class="text-h6 text-bold">Login</div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <form @submit.prevent="login">
          <q-input
            bottom-slots
            v-model="email"
            label="Enter Email"
            class="q-mb-md"
            style="width: 100%"
            :rules="[ val =>  val.includes('@') || '@ is missing']"
          >
            <template v-slot:prepend>
              <q-icon name="email" class="text-indigo q-ml-md" />
            </template>
          </q-input>
          <!-- <q-input
            bottom-slots
            v-model="password"
            label="Enter Password"
            counter
            class="q-mb-md"
            style="width: 100%"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="password" class="text-green" />
            </template>
          </q-input> -->
          <q-input
            bottom-slots
            v-model="password"
            label="Enter Password"
            class="q-mb-md"
            style="width: 100%"
            :rules="['Password contains atleast 8 characters']"
            :type="showPassword ? 'text' : 'password'"
          >
            <template v-slot:prepend>
              <q-icon name="password" class="text-indigo q-ml-md" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
                class="cursor-pointer q-ml-md"
              />
            </template>
          </q-input>
          <q-btn
            label="Login"
            type="submit"
            color="indigo"
            class="q-mt-md q-mb-md text-capitalize"
          />
          <q-btn
            label="Forgot Password"
            color="indigo"
            class="q-mt-md q-mb-md text-capitalize"
            @click="toForgotPage"
          />
        </form>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useAppStore } from "../store/index";
import instance from "../helper/http-config";
const router = useRouter();
const email = ref("");
const password = ref("");
const $q = useQuasar();
const store = useAppStore();
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  // Check if email and password are not empty
  if (!email.value || !password.value) {
    $q.notify({
      message: "Please enter both email and password.",
      color: "orange",
      type: "warning",
    });
    return; // Exit the function if fields are empty
  }

  try {
    const response = await instance.post("/logIn", {
      email: email.value,
      password: password.value,
    });

    // console.log('Response:', response);
    // console.log('Response Data:', response.data);
    // console.log('Response Data:', response.data[0].token);

    if (response.status) {
      // Check if the response indicates success, but not necessarily if credentials are correct
      // const token = response.data.token;
      const token = response.data.data.token;
      // console.log(token);
      store.setToken(token);
      //  console.log(token);
      const isAdmin = response.data.data.user.isAdmin;
      console.log(isAdmin);
      if (isAdmin) {
        $q.notify({
          message: "Logged in Successfully!",
          color: "blue",
          type: "positive",
        });
        router.push("/AdminDashboard");
      } else {
        $q.notify({
          message: "Logged in Successfully!",
          color: "blue",
          type: "positive",
        });
        router.push("/UserDashboard");
      }
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
      message: "Invalid Crendentials!",
      color: "red",
      type: "negative",
    });
  }
};

const toForgotPage = () => {
  // Navigate to the forgot password page
  router.push("/ForgotPage");
};
</script>

<style scoped>
.login-image {
  width: 100%;
  height: auto;
}
.login-page {
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
    max-width: 400px;
  }
}

form {
  display: flex;
  flex-direction: column;
}

.hidden-md-down {
  display: none; /* Initially hide the image */
}

/* Define the breakpoint where the image becomes visible */
@media (min-width: 600px) {
  .hidden-md-down {
    display: flex; /* Show the image on medium screens and larger */
    flex-direction: column;
  }
}
</style>
