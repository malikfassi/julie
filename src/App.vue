<template>
  <div id="app">
    <header-component />
    <itinerary-overview :cities="cities" @scroll-to-city="scrollToCity" />
    <div v-for="(city, index) in cities" :key="city.id" :ref="el => cityRefs[city.id] = el">
      <city-section :city="city" />
      <transit-activity 
        v-if="index < cities.length - 1"
        :transit="transits[index]"
      />
    </div>
    <costs-overview 
      :costs="costs"
      :totalCost="totalCost"
    />
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import HeaderComponent from './components/header.vue'
import ItineraryOverview from './components/overview.vue'
import CitySection from './components/city.vue'
import CostsOverview from './components/costs.vue'
import TransitActivity from './components/transit-activity.vue'

import { transits } from './data/transits.js'
import { rome } from './data/rome.js'
import { florence } from './data/florence.js'
import { venice } from './data/venice.js'
import { milan } from './data/milan.js'
import { lakeComo } from './data/lake-como.js'
import { turin } from './data/turin.js'
import { bologna } from './data/bologna.js'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ItineraryOverview,
    CitySection,
    CostsOverview,
    TransitActivity
  },
  setup() {
    const cities = ref([
      { id: 'rome', ...rome },
      { id: 'florence', ...florence },
      { id: 'venice', ...venice },
      { id: 'milan', ...milan },
      { id: 'lake-como', ...lakeComo },
      { id: 'turin', ...turin },
      { id: 'bologna', ...bologna }
    ])
    const costs = ref([
      { type: 'Accommodation', details: ['Hostels: €420', 'Airbnb: €1,040', 'Total: €1,460'] },
      { 
        type: 'Transportation', 
        details: [
          'Paris to Rome Flight: €120',
          'Inter-city Trains: €245',
          'Local Transport: €100',
          'Total: €465'
        ] 
      },
      { type: 'Food', details: ['Breakfast: €135', 'Lunch: €405', 'Dinner: €540', 'Snacks/Coffee: €270', 'Total: €1,350'] },
      { type: 'Activities and Entrance Fees', details: ['Museums and Attractions: €540', 'Local Experiences: €540', 'Total: €1,080'] },
      { type: 'Miscellaneous Expenses', details: ['Souvenirs, unexpected costs: €270'] }
    ])
    const cityRefs = reactive({})

    const scrollToCity = (cityId) => {
      const cityElement = cityRefs[cityId];
      if (cityElement) {
        cityElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log(`City element not found for cityId: ${cityId}`);
      }
    }

    return {
      cities,
      costs,
      transits,
      totalCost: '€1,925',
      cityRefs,
      scrollToCity
    }
  }
}
</script>

<style>
@import './assets/style.css';
</style>
