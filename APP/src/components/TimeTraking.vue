<template>
  <section class="hero">
    <div class="block mt-6">
      
      <h1 class="content is-large ml-3">Hallo {{ userStore.user.firstname }} {{ userStore.user.lastname }}</h1>
      <div class="box">
        <div v-if="isLastEntryOngoing || timetrackingStore.times.length === 0">
          <button  @click="startWork">
            <i class='bx bx-play-circle green'></i>
            <p class="green content is-medium">Arbeitszeit starten</p>
          </button>
        </div>
        <div v-else>
          <button  @click="endWork">
            <i class='bx bx-stop-circle red'></i>
            <p class="red content is-medium">Arbeitszeit beenden</p>
          </button>
          <p class="content is-normal">Beginn deiner Arbeitszeit: {{ startWorking }}</p>
        </div>
        
      </div>
    </div>
    <RouterLink class="button is-link" to="/summary" >Zur Zeitenübersicht</RouterLink>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/users'
import { useTimetrackingStore } from '@/stores/timetracking'

const userStore = useUserStore()
const timetrackingStore = useTimetrackingStore()

onMounted(() => {
  timetrackingStore.getTimeEntriesByUser(userStore.user.id)
})

const startWork = () => {
  const timestamp = new Date().toISOString();
  const userId = userStore.user.id;
  timetrackingStore.setTimeEntry(userId, timestamp);
}

const endWork = () => {
  const timestamp = new Date().toISOString();
  const userId = userStore.user.id;
  
  if (timetrackingStore.times.length > 0) {
    const sortedTimes = [...timetrackingStore.times].sort((a, b) => new Date(b.tracking_start) - new Date(a.tracking_start));
    
    const lastEntry = sortedTimes[0];

    if (lastEntry.tracking_stop === null) {
      const entryId = lastEntry.id;
      timetrackingStore.updateTimeEntry(userId, entryId, timestamp);
    }
  }
}

const isLastEntryOngoing = computed(() => {
  if (timetrackingStore.times.length > 0) {
    const sortedTimes = [...timetrackingStore.times].sort((a, b) => new Date(b.tracking_start) - new Date(a.tracking_start));
    const lastEntry = sortedTimes[0];
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
button {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-block: 2rem;
}

i {
  font-size: 5rem;
}

.green {
  color: hsl(141, 53%, 53%);
}

.red {
  color: hsl(348, 100%, 61%);
}
</style>