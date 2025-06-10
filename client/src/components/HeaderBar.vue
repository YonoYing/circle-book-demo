<template>
  <header class="taskbar">
    <div class="left-section">
      <router-link to="/" class="logo-link">
        <img alt="Logo" class="logo" />
        <h1 class="title">BookStore</h1>
      </router-link>
    </div>

    <div class="center-section" v-if="searchQuery !== undefined">
      <div class="search-wrapper">
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Search books..."
            class="search-bar"
        />
      </div>
    </div>

  </header>
</template>

<script setup>
  defineProps(['searchQuery'])
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
  flex-shrink: 1;       
  min-width: 0;         
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  flex-wrap: nowrap;   
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 1.5rem;
}

.center-section {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50vw; 
}

.search-wrapper {
  max-width: 50vw;
  width: 100%;
}

.search-bar {
  width: 100%;
  padding: 6px;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
}


@media (max-width: 768px) {
  .search-wrapper {
    max-width: 90vw;
  }

  .title {
    font-size: 1rem;
  }

  .logo {
    height: 30px;
  }

  .search-bar {
    font-size: 0.9rem;
  }
}
</style>
