<template>
  <div>
    <h1>Hallo {{ user.firstname }} {{ user.lastname }}</h1>
    <div v-for="(timeEntry, index) in timetrackingStore.times" :key="index">
      <template v-if="index === 0 || !isSameDate(timeEntry.tracking_start, timetrackingStore.times[index - 1].tracking_start)">
        <p>Datum: {{ formatDate(timeEntry.tracking_start) }}</p>
        <p>Gesamte Stunden an diesem Tag: {{ calculateTotalHoursForDay(timeEntry.tracking_start) }}</p><br>
      </template>
      
      <p>
        {{ formatTime(timeEntry.tracking_start) }} - {{ timeEntry.tracking_stop ? formatTime(timeEntry.tracking_stop) : 'noch aktiv' }}
        ({{ calculateDuration(timeEntry.tracking_start, timeEntry.tracking_stop) }})
      </p>
      <hr v-if="index !== timetrackingStore.times.length - 1 && !isSameDate(timeEntry.tracking_start, timetrackingStore.times[index + 1].tracking_start)">
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/users'
import { useTimetrackingStore } from '@/stores/timetracking'

const userStore = useUserStore()
const user = userStore.user
const timetrackingStore = useTimetrackingStore()

const formatDate = (dateTimeString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};

const formatTime = (dateTimeString) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleTimeString(undefined, options);
};

const isSameDate = (date1, date2) => {
  return new Date(date1).toDateString() === new Date(date2).toDateString();
};

const calculateDuration = (start, stop) => {
  if (!stop) return 'noch aktiv';
  const startDateTime = new Date(start);
  const stopDateTime = new Date(stop);
  const durationInMinutes = Math.floor((stopDateTime - startDateTime) / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const calculateTotalHoursForDay = (dateTimeString) => {
  const entriesForDay = timetrackingStore.times.filter(entry => isSameDate(entry.tracking_start, dateTimeString));
  const totalMinutes = entriesForDay.reduce((total, entry) => {
    if (entry.tracking_stop) {
      const startDateTime = new Date(entry.tracking_start);
      const stopDateTime = new Date(entry.tracking_stop);
      total += Math.floor((stopDateTime - startDateTime) / (1000 * 60));
    }
    return total;
  }, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMinutesRemainder = totalMinutes % 60;
  return `${totalHours}:${totalMinutesRemainder < 10 ? '0' : ''}${totalMinutesRemainder}`;
};
</script>
