<template>
  <div class="city-section">
    <div class="city-header">
      <h2>{{ city.name }}</h2>
      <span class="city-days">{{ city.days }} days</span>
    </div>
    
    <p class="city-description" v-if="city.description">{{ city.description }}</p>
    <div class="suggested-area" v-if="city.suggestedNeighborhood">
      <i class="fas fa-map-marker-alt"></i>
      Suggested Area: {{ city.suggestedNeighborhood }}
    </div>

    <div v-for="(day, index) in city.daysDetails" :key="index" class="day-section">
      <div class="day-header">
        <h3>Day {{ index + 1 }}</h3>
      </div>
      
      <div class="activities-list">
        <div v-for="activity in day.activities" :key="activity.time" class="activity-card">
          <div class="activity-time">{{ activity.time }}</div>
          <div class="activity-content">
            <h4>{{ activity.description }}</h4>
            <p v-if="activity.location" class="activity-location">
              <i class="fas fa-location-dot"></i> {{ activity.location }}
            </p>
          </div>
          <div class="activity-price" v-if="activity.price">{{ activity.price }}</div>
        </div>
      </div>
    </div>

    <transit-activity 
      v-if="nextCityTransit"
      :transit="nextCityTransit"
    />
  </div>
</template>

<style scoped>
.city-section {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.city-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.8rem;
}

.city-days {
  background-color: #4a90e2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

.city-description {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.suggested-area {
  background-color: #f8f9fa;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #666;
  margin-bottom: 1.5rem;
}

.day-section {
  margin: 2rem 0;
}

.day-header {
  margin-bottom: 1rem;
}

.day-header h3 {
  color: #4a90e2;
  font-size: 1.4rem;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  transition: transform 0.2s;
}

.activity-card:hover {
  transform: translateX(5px);
}

.activity-time {
  color: #4a90e2;
  font-weight: 500;
  min-width: 80px;
}

.activity-content {
  flex-grow: 1;
}

.activity-content h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.activity-location {
  margin: 0.5rem 0 0;
  color: #666;
  font-size: 0.9rem;
}

.activity-price {
  color: #2ecc71;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>

<script>
import TransitActivity from './transit-activity.vue'
import { transits } from '../data/transits.js'

export default {
  name: 'CitySection',
  components: {
    TransitActivity
  },
  props: {
    city: {
      type: Object,
      required: true
    },
    nextCity: {
      type: Object,
      required: false
    }
  },
  computed: {
    nextCityTransit() {
      if (!this.nextCity) return null
      const transitKey = `${this.city.id}-${this.nextCity.id}`
      return transits[transitKey]
    }
  }
}
</script>
