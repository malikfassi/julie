<template>
  <div class="itinerary-overview">
    <div class="overview-header">
      <h2>Journey Overview</h2>
      <span class="total-days">{{ totalDays }} Days</span>
    </div>
    
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
        <div class="connection-line">
          <span class="transport-type">Flight</span>
        </div>
      </div>

      <!-- Italian cities -->
      <div v-for="(city, index) in cities" :key="city.id" class="city-stop">
        <div class="city-marker">
          <div class="marker"></div>
          <div class="city-info">
            <h3>{{ city.name }}</h3>
            <span class="days-count">{{ city.days }} days</span>
          </div>
        </div>
        <div v-if="index < cities.length - 1" class="connection-line">
          <span class="transport-type">{{ getTransportType(index) }}</span>
        </div>
      </div>

      <!-- Return to Paris -->
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
</template>

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
      return 'Train' // Between Italian cities
    }
  }
}
</script>

<style scoped>
.itinerary-overview {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.overview-header h2 {
  color: #2c3e50;
  margin: 0;
}

.total-days {
  background-color: #4a90e2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

.journey-timeline {
  position: relative;
  padding: 1rem 0;
}

.city-stop {
  position: relative;
  padding: 1rem 0;
}

.city-marker {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.marker {
  width: 16px;
  height: 16px;
  background-color: #4a90e2;
  border-radius: 50%;
  border: 3px solid #cce0ff;
}

.marker-start {
  background-color: #2ecc71; /* Green for starting point */
  border-color: #d4f5e2;
}

.marker-end {
  background-color: #e74c3c; /* Red for ending point */
  border-color: #fad7d3;
}

.city-info {
  flex-grow: 1;
}

.city-info h3 {
  margin: 0;
  color: #2c3e50;
}

.days-count {
  color: #666;
  font-size: 0.9rem;
}

.connection-line {
  position: relative;
  height: 40px;
  margin-left: 11px;
  border-left: 2px dashed #4a90e2;
}

.transport-type {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.transport-type::before {
  content: '✈️';
  font-size: 1.1em;
}

.transport-type:not(:contains('Flight'))::before {
  content: '🚂';
}
</style>
