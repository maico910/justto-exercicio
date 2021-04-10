<template>
  <q-table
    title="Usuários"
    :data="users"
    :columns="tableColumns"
    :loading="loading"
    loading-label="Carregando usuários"
    class="table grey-3"
    no-data-label="Nenhum usuário criado"
    @row-click="selectUser"
  >
    <template #top>
      <span class="text-h6">
        Usuários
      </span>
      <q-space />
      <q-btn class="q-mr-md" color="positive" icon="refresh" @click="$emit('sync-user')" />
      <q-btn color="blue" icon="add" @click="$emit('add-user')" />
    </template>
  </q-table>
</template>

<script>

export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      tableColumns: [
        { name: 'id', field: 'id', label: 'Id'},
        { name: 'name', field: 'name', label: 'Nome', },
        { name: 'gender', field: 'gender', label: 'Sexo', },
        { name: 'birth', field: 'birth', label: 'Data de Nascimento'},
        { name: 'cpf', field: 'cpf', label: 'CPF', format: (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
      ]
    }
  },

  methods: {
    selectUser(_, user) {
      this.$emit('edit-user', user.id)
    }
  },
}
</script>

<style lang="scss">
  .table {
    background-color: #ffc16d;
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    color: white;
    background-color: $primary
  }

</style>
