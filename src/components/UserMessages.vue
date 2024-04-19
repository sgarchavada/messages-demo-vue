<template>
  <ul id="chat-list-ul" role="list" class="min-w-[250px] mr-2 overflow-auto max-h-[600px]">
    <li class="p-3 rounded-lg hover:bg-[#EFEFEF]" v-for="m in messages" :key="m.id">
      <p>{{ m.title }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    messages: {
      type: Object
    }
  }
}
</script>
