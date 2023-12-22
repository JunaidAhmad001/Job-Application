<template>
  <div class="user-list q-pa-md">
    
    <q-table
      label="User Created List"
      :rows="createUser"
      :columns="headers"
      row-key="id"
      @update:pagination="updatePagination"
      :rows-per-page-options="[5, 10, 15]"
      :header-class="'bg-green-7'"
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
    </q-table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAppStore } from "../store/index";
import { useQuasar } from "quasar";
const $q = useQuasar();
const store = useAppStore();
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

const createUser = computed(() => {
  return store.createUser;
});

const headers = [
  { name: "firstName", label: "First Name", align: "left", field: "firstName", sortable: true },
  { name: "lastName", label: "Last Name", align: "left", field: "lastName", sortable: true },
  { name: "email", label: "Email", align: "left", field: "email", sortable: true },
  { name: "action", label: "Action", align: "left", field: "status", sortable: false },
];

const updatePagination = (newPagination) => {
  pagination.value = newPagination;
};

const acceptUser = (createUser) => {
  $q.dialog({
    dark: true,
    title: 'Alert',
    message: 'Are you sure. Would you like to accept it?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log(`Accepted user: ${createUser.firstName}`);
    // Update user status
    createUser.status = 'Accepted';
  }).onCancel(() => {
    // Handle cancel if needed
  }).onDismiss(() => {
    // Handle dismiss if needed
  });
};

const rejectUser = (createUser) => {
  $q.dialog({
    dark: true,
    title: 'Alert',
    message: 'Are You Sure. Would you like to reject it?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log(`Rejected user: ${createUser.firstName}`);
    // Update user status
    createUser.status = 'Rejected';
  }).onCancel(() => {
    // Handle cancel if needed
  }).onDismiss(() => {
    // Handle dismiss if needed
  });
};
</script>

<style scoped>
.user-list {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
}
</style>
