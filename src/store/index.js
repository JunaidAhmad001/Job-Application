import { defineStore } from 'pinia';

export const useAppStore = defineStore("main", {
  state: () => ({
    adminLoggedIn: false,
    userList: [],
    createUser: [],
    email: "",
    password: "",
    token: null,
  }),
  persist: true,
  getters: {
    getUser() {
      return this.state?.userList;
    },
    getCreatedUser() {
      return this.state?.createUser;
    },
    // clearToken() {
    //   this.token = null;
    //   try {
    //     localStorage.removeItem('authToken');
    //   } catch (error) {
    //     console.error('Error removing token from localStorage:', error);
    //   }
    // },
    // getToken() {
    //   return this.token || localStorage.getItem('authToken');
    // },
  },
  actions: {
    // setToken(newToken) {
    //   this.token = newToken;
    //   try {
    //     localStorage.setItem('authToken', newToken); // Storing token in localStorage
    //   } catch (error) {
    //     console.error('Error setting token in localStorage:', error);
    //   }
    // },

    logoutAdmin() {
      // Clear the token and set adminLoggedIn to false
      this.setToken(null);
      this.setAdminLoggedIn(false);
    },

    setAdminLoggedIn(value) {
      this.adminLoggedIn = value;
    },

    setToken(token) {
      // Store the token in your state
      this.token = token;
    },
    getToken(){
      return this.token;
    },
    
    addUser(payload) {
      this.userList.push(payload);
      return true;
    },
    
    createAdd(payload) {
      this.createUser.push(payload);
      return true;
    },
  },
});
