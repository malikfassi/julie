<template>
  <div id="app">
    <header-component></header-component>
    <itinerary-overview></itinerary-overview>
    <city-section v-for="city in cities" :key="city.id" :city="city" :ref="el => cityRefs[city.id] = el"></city-section>
    <costs-overview :costs="costs" :totalCost="totalCost"></costs-overview>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import HeaderComponent from './components/header.vue'
import ItineraryOverview from './components/overview.vue'
import CitySection from './components/city.vue'
import CostsOverview from './components/costs.vue'

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
    CostsOverview
  },
  setup() {
    const cities = ref([rome, florence, venice, milan, lakeComo, turin, bologna])
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
    const totalCost = ref('€4,460')
    const cityRefs = reactive({})

    const scrollToCity = (cityId) => {
      const cityElement = cityRefs[cityId]
      if (cityElement) {
        cityElement.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.log(`City element not found for cityId: ${cityId}`)
      }
    }

    const calculateTotalCost = () => {
      let total = 0
      cities.value.forEach(city => {
        city.daysDetails.forEach(day => {
          day.activities.forEach(activity => {
            if (activity.price && typeof activity.price === 'string') {
              total += parseFloat(activity.price.replace('€', ''))
            }
          })
        })
      })
      costs.value.forEach(cost => {
        cost.details.forEach(detail => {
          if (detail.includes('Total:')) {
            total += parseFloat(detail.replace('Total: €', ''))
          }
        })
      })
      totalCost.value = `€${total}`
    }

    onMounted(() => {
      calculateTotalCost()
    })

    return {
      cities,
      costs,
      totalCost,
      cityRefs,
      scrollToCity
    }
  }
}
</script>

<style>
@import './assets/style.css';
</style>
