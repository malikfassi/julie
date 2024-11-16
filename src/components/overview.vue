<template>
  <div class="itinerary-overview">
    <div class="overview-header">
      <h2>Journey Overview</h2>
      <span class="total-days">{{ totalDays }} Days</span>
    </div>
    
    <div class="journey-timeline-container">
      <div class="journey-timeline">
        <!-- Starting point: Paris -->
        <div class="city-stop">
          <div class="city-marker">
            <div class="marker marker-start"></div>
            <div class="city-info">
              <h3>Paris</h3>
              <span class="days-count">Starting Point</span>
            </div>
          </div>
        </div>

        <!-- Italian cities -->
        <div v-for="(city, index) in cities" :key="city.id">
          <div class="connection-line" v-if="index > 0">
            <span class="transport-type">{{ getTransportType(index - 1) }}</span>
          </div>
          <div class="city-stop" @click="$emit('scroll-to-city', city.id)">
            <div class="city-marker">
              <div class="marker" :class="{ 'marker-start': index === 0}"></div>
              <div class="city-info">
                <h3>{{ city.name }}</h3>
                <span class="days-count">{{ city.days }} days</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Return to Paris -->
        <div class="connection-line">
          <span class="transport-type">Flight</span>
        </div>
        <div class="city-stop">
          <div class="city-marker">
            <div class="marker marker-end"></div>
            <div class="city-info">
              <h3>Paris</h3>
              <span class="days-count">Return Point</span>
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
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--bg-light);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.transport-type::before {
  content: '✈️';
  font-size: 1em;
}

.transport-type:not(:contains('Flight'))::before {
  content: '🚂';
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
export default {
  name: 'ItineraryOverview',
  props: {
    cities: {
      type: Array,
      required: true
    }
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
