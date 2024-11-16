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
import initSqlJs from 'sql.js'
import HeaderComponent from './components/header.vue'
import ItineraryOverview from './components/overview.vue'
import CitySection from './components/city.vue'
import CostsOverview from './components/costs.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ItineraryOverview,
    CitySection,
    CostsOverview
  },
  setup() {
    const cities = ref([])
    const costs = ref([])
    const totalCost = ref('€0')
    const cityRefs = reactive({})

    const loadDatabase = async () => {
      const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
      });

      const response = await fetch('/path/to/your/mydatabase.db');
      const buffer = await response.arrayBuffer();
      const db = new SQL.Database(new Uint8Array(buffer));

      const query = "SELECT * FROM activities";
      const results = db.exec(query);

      if (results.length > 0) {
        const values = results[0].values;
        cities.value = values.map(([id, time, description, price, image]) => ({
          id, time, description, price, image
        }));
      }
    }

    onMounted(() => {
      loadDatabase();
    })

    return {
      cities,
      costs,
      totalCost,
      cityRefs
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
