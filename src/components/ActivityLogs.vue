<template>

  <div class="user-list q-pa-md">
    <h6>Applicant List</h6>
    <q-table
      :rows="logData"
      :columns="headers"
      row-key="jobId"
      
      @update:pagination="updatePagination"
      :rows-per-page-options="[5, 10, 15,]"
    >
      <!-- <template v-slot:body-cell-cv="props">
        <q-td :props="props">
       
          <a :href="props.row.cv" download>{{ props.row.cv }}</a>
        </q-td>
      </template> -->
      <!-- <template v-slot:body-cell-action="props">
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
  </template> -->
    </q-table>
  </div>
</template>

<script setup>
import {  ref ,onMounted} from "vue";
import instance from "../helper/http-config"
// import { useAppStore } from "../store/index";
// import {useQuasar} from "quasar";
// import axios from "axios";
// import {useRoute} from "vue-router";

const logData = ref([]);
// const $q = useQuasar()
// const store = useAppStore();
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

// const userList = computed(() => {
//   return store.userList;
// });

const headers = [
  { name: "logId", label: "Log ID", align: "left", field: "logId", sortable: true },
//   { name: "statusCode", label: "StatusCode", align: "left", field: "statusCode", sortable: true },
  { name: "action", label: "Action Perform", align: "left", field: "action", sortable: true },
  { name: "username", label: "User Name", align: "left", field: "username", sortable: true },
  { name: "userEmail", label: "User Email", align: "left", field: "userEmail", sortable: true },
  { name: "details", label: "Details", align: "left", field: "details", sortable: true },
  { name: "userAgent", label: "User Agent", align: "left", field: "userAgent", sortable: true },
];

 const fetchData = async () => {
  try {
    const response = await instance.get("/get-all-logs");
    logData.value = response.data?.data?.data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



const updatePagination = (newPagination) => {
  pagination.value = newPagination;
};

//   const acceptUser = async (user) => {
//   try {
//     const result =  $q.dialog({
//       dark: true,
//       title: 'Alert',
//       message: 'Are you sure. Would you like to accept it?',
//       cancel: true,
//       persistent: true,
//     }).onOk(async () => {
//       // Perform actions when user is accepted, e.g., send email
//       // route.params.email
//       const response = await axios.post(`http://192.168.11.172:3000/update-applicants/e267f211-123c-4371-8804-d883db0c0a62`, {
//         // Add your reques't payload here

//        status:user.status="Accepted"
//       });
//      if(response.status=="Success"){
//       alert('how u do?');
//      }
//       console.log(`Accepted user: ${user.userName}`);
//       // Update user status
//       // user.status = 'Accepted';

//       // Add any other logic here based on the response
//     }).onCancel(() => {
//       // Handle cancellation if needed
//     }).onDismiss(() => {
//       // Handle dismiss if needed
//     });

//     console.log('Dialog result:', result);
//   } catch (error) {
//     console.error('Error in acceptUser:', error);
//     // Handle errors
//   }
// };

//  const rejectUser= async (user) => {
//       $q.dialog({
//         dark: true,
//         title: 'Alert',
//         message: 'Are You Sure. Would you like to reject it?',
//         cancel: true,
//         persistent: true
//       }).onOk(() => {
//         // console.log('>>>> OK')
//         // Perform actions when user is accepted, e.g., send email
        
//   // Perform actions when user is rejected, e.g., send email
//   console.log(`Rejected user: ${user.userName}`);
//   // Update user status
//   user.status = 'Rejected';
//       }).onOk(async () => {
//        const response = await axios.post(`http://192.168.11.172:3000/update-applicants/f1ddb114-9c4b-44fb-8e27-f3815d7695fc`, {
//         // Add your reques't payload here

//        status:user.status="rejected"
//       });
//      if(response.status=="Success"){
//       alert('how u do?');
//      }
//       console.log(`Rejected user: ${user.userName}`);
//       // Update user status
//       // user.status = 'Accepted';

//       // Add any other logic here based on the response
//     }).onCancel(() => {
//         // console.log('>>>> Cancel')
//       }).onDismiss(() => {
//         // console.log('I am triggered on both OK and Cancel')
//       })
//     }
     onMounted(() => {
      fetchData();
    });

// const acceptUser = (user) => {
//   alert('Are you sure?')
//   // Perform actions when user is accepted, e.g., send email
//   console.log(`Accepted user: ${user.userName}`);
//   // Update user status
//   user.status = 'Accepted';
// };

// const rejectUser = (user) => {
//   // Perform actions when user is rejected, e.g., send email
//   console.log(`Rejected user: ${user.userName}`);
//   // Update user status
//   user.status = 'Rejected';
// };
</script>

<style scoped>
.user-list {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
}
</style>

