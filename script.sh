#!/bin/bash

# Fix component file names to be lowercase
echo "Fixing component file names..."
cd src/components
for file in *.vue; do
    # Convert filename to lowercase
    lowercase_name=$(echo "$file" | tr '[:upper:]' '[:lower:]')
    if [ "$file" != "$lowercase_name" ]; then
        mv "$file" "$lowercase_name"
    fi
done
cd ../..

# Update App.vue with correct import paths
echo "Updating App.vue..."
cat > src/App.vue << EOL
<template>
  <div id="app">
    <header-component />
    <itinerary-overview :cities="cities" />
    <city-section 
      v-for="city in cities" 
      :key="city.id" 
      :city="city"
    />
    <costs-overview 
      :costs="costs"
      :totalCost="totalCost"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
      { type: 'Transportation', details: ['Between Cities: €200', 'Local Transport: €100', 'Total: €300'] },
      { type: 'Food', details: ['Breakfast: €135', 'Lunch: €405', 'Dinner: €540', 'Snacks/Coffee: €270', 'Total: €1,350'] },
      { type: 'Activities and Entrance Fees', details: ['Museums and Attractions: €540', 'Local Experiences: €540', 'Total: €1,080'] },
      { type: 'Miscellaneous Expenses', details: ['Souvenirs, unexpected costs: €270'] }
    ])
    const totalCost = ref('€4,460')

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
      totalCost.value = \`€\${total + 4460}\`
    }

    onMounted(() => {
      calculateTotalCost()
    })

    return {
      cities,
      costs,
      totalCost
    }
  }
}
</script>

<style>
@import './assets/style.css';
</style>
EOL

echo "Fixed file names and imports!"