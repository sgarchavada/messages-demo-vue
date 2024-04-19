<template>
  <div
    class="container max-w-screen-lg rounded-lg overflow-hidden shadow-md py-3 my-3 bg-white min-h-[800px]"
  >
    <!-- Main View for showing user and messages -->
    <div class="flex flex-row my-3">
      <!-- Left view for showing user list -->
      <div>
        <div class="relative mr-2 mb-2">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#EFEFEF]"
            placeholder="Search User"
          />
        </div>
        <ul id="list" role="list" class="min-w-[250px] mr-2 max-h-full overflow-auto">
          <li
            class="p-3 rounded-lg hover:bg-[#EFEFEF] mt-1"
            v-for="(u, index) in user.users"
            :key="u.id"
            :class="{ 'bg-[#EFEFEF]': u.id === user.active }"
            @click="user.selectUser(u.id, index)"
          >
            <UserListItem :user="u" :active="user.active" />
          </li>
        </ul>
      </div>
      <!-- left view end -->

      <!-- right side view for showing messages of user -->
      <div class="flex flex-1 flex-col min-h-[780px] rounded-lg border border-[#EFEFEF]">
        <div class="flex flex-1 flex-col">
          <div class="bg-[#EFEFEF] rounded-t-lg flex flex-col justify-center h-[80px] w-full px-5">
            <p class="font-medium text-[20px]">{{ user.activeUser?.name }}</p>
            <p class="text-gray-400 text-sm">Status: Busy</p>
          </div>
          <UserMessages :messages="user.messages" />
        </div>

        <!-- Input for sending message to user -->
        <form class="p-2" @submit.prevent="submitForm">
          <div class="relative">
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 text-sm text-gray-900 border rounded-lg bg-[#EFEFEF]"
              placeholder="Message"
              v-model="message"
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Send
            </button>
          </div>
        </form>
        <!-- form end -->
      </div>
      <!-- right view end -->
    </div>
  </div>
  <!-- Main View End -->
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/users'
import UserListItem from './UserListItem.vue'
import UserMessages from './UserMessages.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const message = ref('')
    const user = useUserStore()
    user.fetchAllUsers()

    const submitForm = async () => {
      if (!message.value) return
      // calling api for adding message and wait till its execution so we can scroll to bottom after message added
      await user.sendMessageToUser({
        title: message.value,
        body: 'demo',
        userId: user.active
      })

      // Empty value of input after message added
      message.value = ''

      // Scroll the list after message added
      var div = document.getElementById('chat-list-ul')
      div.scrollTop = div.scrollHeight
    }

    return {
      user,
      message,
      submitForm
    }
  },
  components: {
    UserListItem,
    UserMessages
  }
})
</script>
