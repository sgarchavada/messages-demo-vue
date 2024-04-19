<template>
  <div class="flex items-center space-x-4 cursor-pointer">
    <div class="flex-shrink-0">
      <div
        class="w-8 h-8 rounded-full border flex items-center justify-center bg-green-400 text-white text-sm"
      >
        <p>
          {{
            user.name
              .split(' ')
              .map((name) => name[0])
              .join('')
              .toUpperCase()
          }}
        </p>
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
    </div>
    <!-- <i class="fa-regular fa-trash-can hover:text-red-500"></i> -->
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>
