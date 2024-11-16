<template>
  <div class="city-section" :ref="city.id">
    <div class="city-header">
      <div class="city-main-info">
        <h2>{{ city.name }}</h2>
        <span class="city-days">{{ city.days }} days</span>
      </div>
      
      <!-- City Overview/Recap -->
      <div class="city-overview">
        <div class="overview-stats">
          <div class="stat">
            <i class="fas fa-bed"></i>
            <span>{{ getDailyActivitiesCount('accommodation') }} Hotels</span>
          </div>
          <div class="stat">
            <i class="fas fa-utensils"></i>
            <span>{{ getDailyActivitiesCount('food') }} Restaurants</span>
          </div>
          <div class="stat">
            <i class="fas fa-monument"></i>
            <span>{{ getDailyActivitiesCount('attraction') }} Attractions</span>
          </div>
          <div class="stat">
            <i class="fas fa-euro-sign"></i>
            <span>{{ getTotalCityCost() }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <p class="city-description" v-if="city.description">{{ city.description }}</p>
    <div class="suggested-area" v-if="city.suggestedNeighborhood">
      <i class="fas fa-map-marker-alt"></i>
      Suggested Area: {{ city.suggestedNeighborhood }}
    </div>

    <div v-for="(day, index) in city.daysDetails" :key="index" class="day-section">
      <div class="day-header" @click="toggleDay(index)">
        <div class="day-title">
          <h3>Day {{ index + 1 }}</h3>
          <span class="day-summary" v-if="!expandedDays[index]">
            {{ getDaySummary(day) }}
          </span>
        </div>
        <button class="toggle-btn" :class="{ 'expanded': expandedDays[index] }">
          <i class="fas" :class="expandedDays[index] ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
      </div>
      
      <div class="activities-list" v-show="expandedDays[index]">
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

<script>
import { ref } from 'vue'
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
  setup(props) {
    const expandedDays = ref({})

    const toggleDay = (index) => {
      expandedDays.value[index] = !expandedDays.value[index]
    }

    const getDaySummary = (day) => {
      const highlights = day.activities
        .filter(activity => activity.description.includes('Visit') || activity.description.includes('Explore'))
        .map(activity => activity.description.replace('Visit ', '').replace('Explore ', ''))
        .slice(0, 2)
      
      return highlights.join(' • ') || 'Various activities'
    }

    const getDailyActivitiesCount = (type) => {
      let count = 0
      props.city.daysDetails.forEach(day => {
        day.activities.forEach(activity => {
          if (activity.type === type) count++
        })
      })
      return count
    }

    const getTotalCityCost = () => {
      let total = 0
      props.city.daysDetails.forEach(day => {
        day.activities.forEach(activity => {
          if (activity.price) {
            total += parseInt(activity.price.replace('€', ''))
          }
        })
      })
      return `€${total}`
    }

    return {
      expandedDays,
      toggleDay,
      getDaySummary,
      getDailyActivitiesCount,
      getTotalCityCost
    }
  },
  computed: {
    nextCityTransit() {
      if (!this.nextCity) return null
      return transits.find(transit => transit.from === this.city.name && transit.to === this.nextCity.name)
    }
  }
}
</script>

<style scoped>
.city-section {
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
}

.city-header h2 {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.8rem;
}

.city-days {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

.city-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.suggested-area {
  background-color: var(--bg-light);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.day-section {
  margin: 2rem 0;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-light);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.day-header:hover {
  background-color: #f0e6f6; /* Light Purple */
}

.day-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.day-title h3 {
  color: var(--secondary-color);
  margin: 0;
}

.day-summary {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.toggle-btn.expanded {
  transform: rotate(180deg);
}

.activities-list {
  margin-top: 1rem;
  animation: slideDown 0.3s ease-out;
}

.activity-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  background-color: var(--bg-light);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: transform 0.2s;
}

.activity-card:hover {
  transform: translateX(5px);
}

.activity-time {
  color: var(--secondary-color);
  font-weight: 500;
  min-width: 80px;
}

.activity-content {
  flex-grow: 1;
}

.activity-content h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.activity-location {
  margin: 0.5rem 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.activity-price {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 1.1rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
