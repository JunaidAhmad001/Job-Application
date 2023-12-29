<template>
  <div class="user-list q-pa-md">
    <q-table
      title="Applicant list"
      :rows="apiData"
      :columns="headers"
      row-key="jobId"
      :filter="filter"
      @update:pagination="updatePagination"
      :rows-per-page-options="[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
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
            <q-icon name="search" @click="fetchingData(apiData)" style="border-radius" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div>
            <span
              v-if="showAcceptRejectButtons(props.row)"
              class="clickable-text positive"
              @click="acceptUser(props.row)"
            >
              Accept
            </span>
            <span
              v-if="showAcceptRejectButtons(props.row)"
              class="clickable-text negative"
              @click="rejectUser(props.row)"
            >
              Reject
            </span>
          </div>
          <!-- <q-chip
            v-if="props.row.status === 'Accepted'"
            color="positive"
            label="Accepted"
          />
          <q-chip
            v-if="props.row.status === 'Rejected'"
            color="negative"
            label="Rejected"
          /> -->
        </q-td>
      </template>
      <template v-slot:body-cell-download="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            icon="download"
            @click="downloadApplicant(props.row)"
            class="text-black"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            icon="information"
            @click="openApplicantDetailsModal(props.row)"
            class="text-indigo"
          />
        </q-td>
      </template>
    </q-table>
    <!-- Modal for Applicant Details -->
    <q-dialog v-model="showApplicantDetailsModal" persistent>
      <q-card style="width: 350px">
        <q-card-section class="q-pt-md">
          <q-item>
            <q-item-section>
              <h5 class="text-h6">Applicant Details</h5>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section>
              <strong>Qualification:</strong>
              {{ applicantDetails.Qualification }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <strong>CNIC:</strong> {{ applicantDetails.CNIC }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <strong>Age:</strong> {{ applicantDetails.Age }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <strong>Phone Number:</strong>
              {{ applicantDetails["Phone Number"] }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <strong>Address:</strong> {{ applicantDetails.Address }}
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Close"
            color="indigo"
            @click="closeApplicantDetailsModal"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useAppStore } from "../store/index";
import { ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
import instance from "../helper/http-config";

// const route = useRoute();
// const filteredData = ref([]);
const apiData = ref([]);
const store = useAppStore();
const showApplicantDetailsModal = ref(false);
const applicantDetails = ref({});

const fetchingData = async (list) => {
  console.log(list);
  try {
    const response = await instance.get(`/get-applicants`, {
      params: {
        search: list.search, // Use the value of the filter variable as the search parameter
      },
    });
    apiData.value = response.data?.data?.data;
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const openApplicantDetailsModal = (user) => {
  // Set the details to be displayed in the modal
  applicantDetails.value = {
    Qualification: user.qualification,
    CNIC: user.cnic,
    Age: user.age,
    "Phone Number": user.phoneNumber,
    Address: user.address,
  };
  showApplicantDetailsModal.value = true;
};

const closeApplicantDetailsModal = () => {
  showApplicantDetailsModal.value = false;
};
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});
const headers = [
  {
    name: "Id",
    label: "Job ID",
    align: "left",
    field: "Id",
    sortable: true,
  },
  {
    name: "userName",
    label: "User Name",
    align: "left",
    field: "userName",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "download",
    label: "CV",
    align: "left",
    field: "download",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
    sortable: false,
  },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "status",
    sortable: false,
  },
  {
    name: "details",
    label: "Details",
    align: "left",
    field: "details",
    sortable: false,
  }, //
];
const token = store.getToken();

const acceptUser = async (user) => {

  try {
    let response = await instance.patch(
      `/update-applicants/${user.jobId}`,
      {
        status: "accepted",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status == "Success") {
      console.log("response");
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectUser = async (user) => {
  try {
    await instance.patch(
      `/update-applicants/${user.jobId}`,
      {
        status: "rejected",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // if(response.data.status=="Suc"){
    // console.log("response");
    // }
  } catch (error) {
    console.log(error);
  }
};
const showAcceptRejectButtons = (user) => {
  // console.log("User status:", user.status);
  return user.status !== "accepted" && user.status !== "rejected";
};
const fetchData = async () => {
  try {
    const response = await instance.get("/get-applicants");
    apiData.value = response.data?.data?.data;
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const downloadApplicant = async (user) => {
  console.log(user.jobId);
  const token = store.getToken();
  try {
    const response = await instance.get(`/download-cv/${user.jobId}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the filename from the Content-Disposition header
    const contentDisposition = response.headers["content-disposition"];
    const matches =
      contentDisposition && contentDisposition.match(/filename="(.+)"/);
    const suggestedFilename = matches && matches[1];

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    // Set the filename for download (use the suggested filename or a default)
    link.download = suggestedFilename || `CV_${user.jobId}.pdf`;

    link.click();
  } catch (error) {
    console.error("Error downloading CV:", error);
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
.clickable-text {
  cursor: pointer;
  text-decoration: underline;
  margin-right: 10px;
}

.positive {
  color: green;
}

.negative {
  color: red;
}
.user-list {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
}
</style>
