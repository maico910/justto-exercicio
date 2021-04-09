<template>
  <q-dialog :value="true" @hide="$emit('hide')">
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          Adicionar Usuário
        </div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="addUser">
          <q-input v-model="newUser.name" :rules="[nome => !!nome || 'Insira seu nome', nome => nome.length >= 3 || 'Insira nome com mais de 3 letras']" lazy-rules outlined label="Nome" />

          <div>
            <q-radio v-model="newUser.gender" val="M">
              Masculino
            </q-radio>
            <q-radio v-model="newUser.gender" val="F">
              Feminino
            </q-radio>
          </div>

          <q-input v-model="newUser.birth" filled mask="date" lazy-rules :rules="[data => !!data || 'Insira o seu aniversário']">
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="newUser.birth">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-model="newUser.cpf" outlined label="CPF" lazy-rules :rules="[cpf => !!cpf || 'Insira o seu CPF', cpf => cpf.length == 11 || 'Insira um CPF válido']" unmasked-value mask="###.###.###-##" />

          <q-card-actions align="right">
            <q-btn ref="close-button" v-close-popup :disable="loading.addUser" color="negative" label="Voltar" />
            <q-btn :disable="loading.addUser" type="submit" :loading="loading.addUser" color="primary" label="Criar" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    props: {
      // show: {
      //   type: Boolean
      // },
    },
    data() {
      return {
        newUser: {
          name: '',
          gender: '',
          birth: '',
          cpf: ''
        },
        loading: {
          addUser: false
        }
      }
    },
    methods: {
      addUser() {
        if (!this.newUser.gender) {
          this.$q.notify({
            message: 'Por favor, escolha o sexo',
            color: 'negative'
          })
          return
        }

        this.loading.addUser = true
        this.$store.dispatch('user/addUser', this.newUser).then(() => {
          this.$q.notify({
            message: "Usuário criado com sucesso",
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
      }
    },
  }
</script>

<style lang="scss" scoped>
  .q-form > * {
    margin-bottom: 10px
  }
</style>