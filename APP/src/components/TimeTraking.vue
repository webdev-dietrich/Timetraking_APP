<template>
  <h1>Hallo {{ userStore.user.firstname }} {{ userStore.user.lastname }}</h1>
  <div class="proceed_box">
    <div class="proceed_box_button">
      <i class='bx bx-play-circle green'></i>
      <p class="green">Arbeitszeit starten</p>
    </div>
  </div>
  <div class="proceed_box">
    <div class="proceed_box_button">
      <i class='bx bx-stop-circle stop red'></i>
      <p class="red">Arbeitszeit beenden</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/users'

const userStore = useUserStore()
</script>

<style scoped>
.proceed_box {
  width: 50%;
  margin: auto;
  display: flex;
  padding-block: 3rem;
  justify-content: space-between;
}

i {
  font-size: 3rem;
}

.proceed_box_button {
  display: flex;
  cursor: pointer;
  align-items: center;
}
.proceed_box_button p {
  margin-left: .75rem;
}

.green {
  color: rgb(51, 212, 51);
}

.red {
  color: rgb(228, 80, 80);
}

</style>