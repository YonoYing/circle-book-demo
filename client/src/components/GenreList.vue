<template>
  <aside class="genre-filter">
    <div class="genre-box">
        <h2 class="genre-title"><strong>Genres</strong></h2>
        <ul class="genre-list">
        <li v-for="genre in genres" :key="genre" class="genre-item">
            <a href="#">{{ genre }}</a>
        </li>
        </ul>
    </div>
  </aside>
</template>

<script setup>
const genres = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'Fantasy',
  'Romance',
  'Mystery',
  'Biography',
  'History'
]
</script>

<style scoped>
.genre-filter {
  width: 20%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;  
  align-items: flex-start;  
  padding-top: 200px;     
  box-sizing: border-box;
}

.genre-box {
  background-color: rgba(241, 247, 255, 0.842);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.247);
  font-family: 'Segoe UI', sans-serif;
  height: max-content;
  width: 70%;
  margin-top: 0;
  flex-shrink: 0;
  position: relative; 
}

.genre-title {
  font-size: 1.3rem;
  font-weight: 100;
  margin-bottom: 16px;
  color: black;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.genre-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.genre-item {
  margin-bottom: 12px;
}

.genre-item a {
  display: inline-block;
  width: 100%;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  transition: background-color 0.2s ease;
}

.genre-item a:hover {
  background-color: #ecf0f1;
}

@media (max-width: 1000px) {
  .genre-filter {
    position: static;
    margin: 0 auto 20px;
    width: 100%;
    max-width: 100%;
    padding-top: 0px;
  }
}
</style>
