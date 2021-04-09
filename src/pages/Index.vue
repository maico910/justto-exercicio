<template>
  <q-page class="flex flex-center bg-grey-13">
    <TableUser :loading="loading.users" :users="users" @sync-user="syncUsers" @add-user="showDialog.addUser = true" @edit-user="(user) => currentUser = user" />
    
    <DialogAddUser v-if="showDialog.addUser" @hide="showDialog.addUser = false" />
  </q-page>
</template>

<script>
import TableUser from 'src/components/User/TableUser.vue'
import { mapGetters } from 'vuex';
import DialogAddUser from 'src/components/User/DialogAddUser.vue';
export default {
  name: 'PageIndex',
  components: { TableUser, DialogAddUser },

  data() {
    return {
      loading: {
        users: false
      },
      },
      showDialog: {
        addUser: false,
      currentUser: null
    }
  },

  computed: {
    ...mapGetters('user', {
      users: 'users',
    })
  },

  created () {
    this.syncUsers();
  },

  methods: {
    syncUsers() {
      this.loading.users = true
      this.$store.dispatch('user/getAllUsers').catch(erro => {
        this.$q.notify({
          message: `Ocorreu um erro:  ${erro}`,
          color: 'negative'
        })
      }).finally(() => {
        this.loading.users = false
      })
    }
  },
}
</script>
