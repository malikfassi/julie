<template>
  <div class="itinerary-overview">
    <div class="overview-header">
      <h2>Journey Overview</h2>
      <div class="total-days">24 Days</div>
    </div>
    <div class="journey-timeline-container">
      <div class="journey-timeline">
        <div v-for="(city, index) in cities" :key="city.id" class="city-stop">
          <div class="city-marker">
            <div class="marker" :class="{ 'marker-start': index === 0 }"></div>
            <div>{{ city.name }}</div>
            <div>{{ city.days }} days</div>
          </div>
          <div v-if="index > 0 && index < cities.length" class="transport-line">
            <div class="transport-type">
              {{ transits[index - 1]?.type || 'N/A' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.itinerary-overview {
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.overview-header h2 {
  color: var(--text-primary);
  margin: 0;
}

.total-days {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

.journey-timeline-container {
  overflow-x: auto;
}

.journey-timeline {
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  min-width: min-content;
  position: relative;
}

.city-stop {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
  position: relative;
}

.city-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.marker {
  width: 16px;
  height: 16px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  border: 3px solid #ffe4e1;
}

.marker-start {
  background-color: #ff69b4;
  border-color: #ffb6c1;
}

.marker-end {
  background-color: #ff4500;
  border-color: #ffdab9;
}

.city-info {
  width: 120px;
  text-align: center;
}

.city-info h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1rem;
  white-space: nowrap;
}

.days-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: block;
  margin-top: 0.25rem;
}

.connection-line {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 2px;
  background: var(--secondary-color);
  margin: 0 -50px;
  align-self: center;
  margin-top: 25px;
}

.transport-type {
  position: absolute;
  top: -20px;
  left: -60%;
  transform: translateX(-50%);
  background-color: white;
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  color: var(--text-secondary);
  z-index: 1;
}

.transport-type::before {
  content: '✈️';
  font-size: 1em;
}

.transport-type:not(:contains('Flight'))::before {
  content: '🚂';
}

.transport-line {
  position: relative;
  width: 100px;
  height: 2px;
  background-color: var(--secondary-color);
  margin: 0 auto;
}

@media (max-width: 768px) {
  .itinerary-overview {
    padding: 1rem;
  }
  
  .journey-timeline {
    padding: 1rem 0.5rem;
  }
  
  .city-stop {
    min-width: 120px;
  }
  
  .connection-line {
    width: 80px;
    margin: 0 -40px;
  }
  
  .city-info h3 {
    font-size: 0.9rem;
  }
  
  .days-count {
    font-size: 0.8rem;
  }
}
</style>

<script>
import { transits } from '@/data/transits';

export default {
  name: 'ItineraryOverview',
  data() {
    return {
      cities: [
        { id: 'paris', name: 'Paris', days: 0 },
        { id: 'rome', name: 'Rome', days: 5 },
        { id: 'florence', name: 'Florence', days: 4 },
        { id: 'venice', name: 'Venice', days: 3 },
        { id: 'milan', name: 'Milan', days: 3 },
        { id: 'lake-como', name: 'Lake Como', days: 3 },
        { id: 'turin', name: 'Turin', days: 3 }
      ],
      transits
    };
  },
  computed: {
    totalDays() {
      return this.cities.reduce((total, city) => total + (city.days || 0), 0)
    }
  },
  methods: {
    getTransportType(cityIndex) {
      if (cityIndex === this.cities.length - 1) {
        return 'Flight' // Last Italian city to Paris
      }
      return 'Flight' // Between Italian cities
    }
  }
}
</script>
