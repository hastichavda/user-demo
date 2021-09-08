<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div class="mt-1">
              <input
                v-model="formData.title"
                name="title"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="body" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <input
                v-model="formData.body"
                name="body"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click.prevent="submitUser"
            >
              {{ buttonText }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      formData: {
        title: '',
        body: '',
      },
    }
  },

  computed: {
    ...mapGetters(['getSelectedUser']),
    buttonText() {
      return this.$route.params.id ? 'Update' : 'Save'
    },
  },

  watch: {
    getSelectedUser() {
      this.setEditData()
    },
  },

  methods: {
    ...mapActions(['addUser', 'fetchUser', 'updateUser']),

    async setEditData() {
      let res = localStorage.getItem('selectedUser')
      if (res) {
        this.formData.title = res.title
        this.formData.body = res.body
      }
      if (this.getSelectedUser) {
        this.formData.title = this.getSelectedUser.title
        this.formData.body = this.getSelectedUser.body
      }
    },

    submitUser() {
      let res
      if (this.$route.params.id) {
        res = this.updateUser({ id: this.$route.params.id, ...this.formData })
        if (res.data) {
          this.$router.push('/')
        }
      } else {
        res = this.addUser(this.formData)
        if (res.data) {
          this.$router.push('/')
        }
      }
    },
  },
}
</script>
