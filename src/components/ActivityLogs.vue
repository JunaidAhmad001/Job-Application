<template>
  <div class="user-list q-pa-md">
    <q-table
      title="Activity List"
      :rows="logData"
      :columns="headers"
      row-key="jobId"
      @update:pagination="updatePagination"
      :rows-per-page-options="[5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500]"
    >
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import instance from "../helper/http-config";
const logData = ref([]);

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});


const headers = [
  {
    name: "logId",
    label: "Log ID",
    align: "left",
    field: "logId",
    sortable: true,
  },
 
  {
    name: "action",
    label: "Action Perform",
    align: "left",
    field: "action",
    sortable: true,
  },
  {
    name: "username",
    label: "User Name",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "userEmail",
    label: "User Email",
    align: "left",
    field: "userEmail",
    sortable: true,
  },
  {
    name: "details",
    label: "Details",
    align: "left",
    field: "details",
    sortable: true,
  },
  {
    name: "createdAt",
    label: "CreatedAt",
    align: "left",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "updatedAt",
    label: "UpdatedAt",
    align: "left",
    field: "updatedAt",
    sortable: true,
  },
];

const fetchData = async () => {
  try {
    const response = await instance.get("/get-all-logs");
    logData.value = response.data?.data?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const updatePagination = (newPagination) => {
  pagination.value = newPagination;
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
