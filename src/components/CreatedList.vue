<template>
  <div class="user-list q-pa-md">
    <q-table
      label="User Created List"
      :rows="createUser"
      :columns="headers"
      row-key="id"
      :filter="filter"
      @update:pagination="updatePagination"
      :rows-per-page-options="[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
      :header-class="'bg-green-7'"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon
              name="search"
              @click="fetchingData(createUser)"
              style="border-radius"
            />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            v-if="
              props.row.status !== 'Accepted' && props.row.status !== 'Rejected'
            "
            color="positive"
            label="Accept"
            @click="acceptUser(props.row)"
          />
          <q-btn
            v-if="
              props.row.status !== 'Accepted' && props.row.status !== 'Rejected'
            "
            color="negative"
            label="Reject"
            @click="rejectUser(props.row)"
          />
          <q-chip
            v-if="props.row.status === 'Accepted'"
            color="positive"
            label="Accepted"
          />
          <q-chip
            v-if="props.row.status === 'Rejected'"
            color="negative"
            label="Rejected"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useAppStore } from "../store/index";
import { onMounted, ref } from "vue";
// import { useAppStore } from "../store/index";
import instance from "../helper/http-config";
import { useQuasar } from "quasar";
// import { storeToRefs } from "pinia";
const store = useAppStore();
const $q = useQuasar();

const createUser = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

const headers = [
  {
    name: "userId",
    label: "User ID",
    align: "left",
    field: "userId",
    sortable: true,
  },
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: "firstName",
    sortable: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    align: "left",
    field: "lastName",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  // { name: "gmail", label: "Gmail", align: "left", field: "gmail", sortable: true },
  {
    name: "isVerified",
    label: "Verified User",
    align: "left",
    field: "isVerified",
    sortable: true,
  },
  // { name: "action", label: "Action", align: "left", field: "status", sortable: false },
];
 const token = store.getToken();
const fetchingData = async (list) => {
 
  console.log(list);
  try {
    const response = await instance.get(`/get-all-users`, {
      params: {
        search: list.search // Use the value of the filter variable as the search parameter
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    createUser.value = response.data?.data?.data;
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchData = async () => {
  const token = store.getToken();
  try {
    const response = await instance.get("/get-all-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    createUser.value = response.data?.users;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const updatePagination = (newPagination) => {
  pagination.value = newPagination;
};

const acceptUser = (createUser) => {
  $q.dialog({
    dark: true,
    title: "Alert",
    message: "Are you sure. Would you like to accept it?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(`Accepted user: ${createUser.firstName}`);
      // Update user status
      createUser.status = "Accepted";
    })
    .onCancel(() => {
      // Handle cancel if needed
    })
    .onDismiss(() => {
      // Handle dismiss if needed
    });
};

const rejectUser = (createUser) => {
  $q.dialog({
    dark: true,
    title: "Alert",
    message: "Are You Sure. Would you like to reject it?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(`Rejected user: ${createUser.firstName}`);
      // Update user status
      createUser.status = "Rejected";
    })
    .onCancel(() => {
      // Handle cancel if needed
    })
    .onDismiss(() => {
      // Handle dismiss if needed
    });
};
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.user-list {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
}
</style>
