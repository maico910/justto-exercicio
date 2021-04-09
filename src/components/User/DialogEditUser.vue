<template>
  <q-dialog :value="true" @hide="$emit('hide')">
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          Editar Usuário
        </div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="editUser">
          <q-input v-model="user.name" :rules="[nome => !!nome || 'Insira seu nome', nome => nome.length >= 3 || 'Insira nome com mais de 3 letras']" lazy-rules outlined label="Nome" />

          <div>
            <q-radio v-model="user.gender" val="M">
              Masculino
            </q-radio>
            <q-radio v-model="user.gender" val="F">
              Feminino
            </q-radio>
          </div>

          <q-input v-model="user.birth" filled mask="date" lazy-rules :rules="[data => !!data || 'Insira o seu aniversário']">
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="user.birth">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-model="user.cpf" outlined label="CPF" lazy-rules :rules="[cpf => !!cpf || 'Insira o seu CPF', cpf => cpf.length == 11 || 'Insira um CPF válido']" unmasked-value mask="###.###.###-##" />

          <q-card-actions align="between">
            <q-btn :loading="loading.deleteUser" :disable="loading.editUser" icon="delete" color="black" @click="deleteUser" />
            <div>
              <q-btn class="q-mr-md" :disable="loading.editUser" color="negative" label="Voltar" @click="$emit('hide')" />
              <q-btn :disable="loading.editUser" type="submit" :loading="loading.editUser" color="primary" label="Salvar" />
            </div>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    props: {
      userId: {
        type: String
      },
    },
    data() {
      return {
        user: {},
        loading: {
          editUser: false,
          deleteUser: false
        }
      }
    },
    computed: {
      ...mapGetters('user', {
        getUser: 'userById',
      }),
    },
    mounted () {
      if (!this.userId) {
        this.$q.notify({
          message: 'Usuário não encontrado',
          color: 'negative'
        })
      } else {
        this.user = JSON.parse(JSON.stringify(this.getUser(this.userId)))
      }
    },

    methods: {
      editUser() {
        if (!this.user.gender) {
          this.$q.notify({
            message: 'Por favor, escolha o sexo',
            color: 'negative'
          })
          return
        }

        this.loading.editUser = true
        this.$store.dispatch('user/editUser', this.user).then(() => {
          this.$q.notify({
            message: "Usuário editado com sucesso",
            color: 'primary'
          })
          this.$emit('hide')
        }).catch(erro => {
          this.$q.notify({
            message: `Ocorreu um erro:  ${erro}`,
            color: 'negative'
          })
        }).finally(() => {
          this.loading.addUser = false
        })
      },

      deleteUser() {
        this.$q.dialog({
          title: 'Deletar usuário',
          message: 'Tem certeza que quer deletar o usuário atual?',
          ok: {
            label: 'Sim',
            color: 'negative'
          },
          cancel: {
            label: 'Voltar'
          }
        }).onOk(() => {
          this.loading.deleteUser = true

          this.$store.dispatch('user/deleteUser', this.user.id).then(() => {
            this.$q.notify({
              message: "Usuário deletado com sucesso",
              color: 'primary'
            })
            this.$emit('hide')
          }).catch(erro => {
            this.$q.notify({
              message: `Ocorreu um erro:  ${erro}`,
              color: 'negative'
            })
          }).finally(() => {
            this.loading.deleteUser = false
          })
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .q-form > * {
    margin-bottom: 10px
  }
</style>