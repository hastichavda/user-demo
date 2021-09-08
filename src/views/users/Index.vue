<template>
  <div class="max-w-7xl mx-6">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
      <div
        class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap"
      >
        <div class="ml-4 mt-2">
          <h3 class="text-2xl  leading-6 font-semibold text-gray-900">
            Users
          </h3>
        </div>
        <div class="ml-4 mt-2 flex-shrink-0">
          <router-link
            to="/create"
            class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create new user
          </router-link>
        </div>
      </div>
      <table class="min-w-full mt-5 divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>

            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Delete </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in getUsers"
            :key="index"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.body }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              @click.prevent="editUser(user)"
            >
              <router-link
                :to="`/edit/${user.id}`"
                class="text-indigo-600 hover:text-indigo-900"
                >Edit</router-link
              >
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <button
                class="text-red-500 hover:text-red-300"
                type="button"
                @click="removeUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUsers']),
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser', 'fetchUser']),

    editUser(user) {
      this.fetchUser(user)
    },

    removeUser(id) {
      alert('are you sure ?', this.deleteUser(id))
    },
  },
}
</script>
