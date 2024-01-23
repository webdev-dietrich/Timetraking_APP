<template>
  <h1>Hallo {{ userStore.user.firstname }} {{ userStore.user.lastname }}</h1>
  <div class="proceed_box" v-if="isLastEntryOngoing || timetrackingStore.times.length === 0">
    <div class="proceed_box_button" @click="startWork">
      <i class='bx bx-play-circle green'></i>
      <p class="green">Arbeitszeit starten</p>
    </div>
  </div>
  <div class="proceed_box" v-else>
    <div class="proceed_box_button" @click="endWork">
      <i class='bx bx-stop-circle stop red'></i>
      <p class="red">Arbeitszeit beenden</p>
    </div>
    
  </div>
  <p>Beginn deiner Arbeitszeit: {{ startWorking }}</p>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/users'
import { useTimetrackingStore } from '@/stores/timetracking'

const userStore = useUserStore()
const timetrackingStore = useTimetrackingStore()

const startWork = () => {
  const timestamp = new Date().toISOString();
  const userId = userStore.user.id;
  timetrackingStore.setTimeEntry(userId, timestamp);
}

const endWork = () => {
  const timestamp = new Date().toISOString();
  const userId = userStore.user.id;
  const lastEntry = timetrackingStore.times[timetrackingStore.times.length - 1];
  const entry_id = lastEntry.id;
  timetrackingStore.updateTimeEntry(userId, entry_id, timestamp);
}

const isLastEntryOngoing = computed(() => {
  if (timetrackingStore.times.length > 0) {
    const lastEntry = timetrackingStore.times[timetrackingStore.times.length - 1];
    return lastEntry.tracking_stop !== null;
  }
  return false;
});

const startWorking = computed(() => {
  const lastEntry = timetrackingStore.times[timetrackingStore.times.length - 1];
  
  if (lastEntry) {
    const trackingStart = new Date(lastEntry.tracking_start);
    const formattedTime = trackingStart.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = trackingStart.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return `${formattedTime} ${formattedDate}`;
  }

  return null; 
});

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