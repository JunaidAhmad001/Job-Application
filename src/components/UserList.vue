<template>
  <div class="user-list q-pa-md">
    <q-table
      
      :rows="apiData"
      :columns="headers"
      row-key="jobId"
      @update:pagination="updatePagination"
      :rows-per-page-options="[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            v-if="props.row.status !== 'Accepted' && props.row.status !== 'Rejected'"
            color="positive"
            label="Accept"
            @click="acceptUser(props.row)"
          />
          <q-btn
            v-if="props.row.status !== 'Accepted' && props.row.status !== 'Rejected'"
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
      <template v-slot:body-cell-download="props">
        <q-td :props="props">
          <q-btn
            color="blue"
            label="Download"
            dense
            @click="downloadApplicant(props.row.cv)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import instance from "../helper/http-config";

const apiData = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});
const headers = [
  { name: "jobId", label: "Job ID", align: "left", field: "jobId", sortable: true },
  { name: "userName", label: "User Name", align: "left", field: "userName", sortable: true },
  { name: "email", label: "Email", align: "left", field: "email", sortable: true },
  { name: "qualification", label: "Qualification", align: "left", field: "qualification", sortable: true },
  { name: "cnic", label: "Cnic", align: "left", field: "cnic", sortable: true },
  { name: "address", label: "Address", align: "left", field: "address", sortable: true },
  { name: "phoneNumber", label: "Phone Number", align: "left", field: "phoneNumber", sortable: true },
  { name: "age", label: "Age", align: "left", field: "age", sortable: true },
  { name: "cv", label: "CV", align: "left", field: "cv", sortable: true },
  { name: "status", label: "Action", align: "left", field: "status", sortable: false },
];

 const fetchData = async () => {
  try {
    const response = await instance.get("/get-applicants");
    apiData.value = response.data?.data?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const downloadApplicant = (cvUrl) => {
  // Construct the download link using the provided CV URL
  const downloadLink = document.createElement("a");
  downloadLink.href = cvUrl;
  downloadLink.target = "_blank";
  downloadLink.download = "CV_File.pdf"; // You can customize the file name here
  downloadLink.click();
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
<!--
const acceptUser = async (user) => {
  try {
    // Make an HTTP request to your backend to send an email
    await sendEmail(user.email, 'Your subject', 'Your acceptance email content');
    // Update user status
    user.status = 'Accepted';
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const rejectUser = async (user) => {
  try {
    // Make an HTTP request to your backend to send an email
    await sendEmail(user.email, 'Your subject', 'Your rejection email content');
    // Update user status
    user.status = 'Rejected';
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendEmail = async (to, subject, content) => {
  // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
  const apiUrl = 'YOUR_BACKEND_API_ENDPOINT/send-email';

  // Make an HTTP request to your backend
  await axios.post(apiUrl, {
    to,
    subject,
    content,
  });
};

-->