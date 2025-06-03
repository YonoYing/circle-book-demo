<template>
  <header class="taskbar">
    <div class="left-section">
      <router-link to="/" class="logo-link">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
        <h1 class="title">BookStore</h1>
      </router-link>
    </div>

    <div class="center-section" v-if="searchQuery !== undefined">
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        placeholder="Search books..."
        class="search-bar"
      />
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    required: false,
  }
})

defineEmits(['update:searchQuery'])
</script>

<style scoped>
.taskbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 1.5rem;
}

.center-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-bar {
  display: fixed;
  width: 50%;
  padding: 6px;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
}
</style>
