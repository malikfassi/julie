<template>
  <div class="city-section" :ref="city.id">
    <div class="city-header" @click="toggleActivities">
      <div class="city-main-info">
        <h2>{{ city.name }}</h2>
        <i :class="showActivities ? 'fas fa-angle-up' : 'fas fa-angle-down'" class="collapse-icon"></i>
      </div>
      
      <!-- Compact City Overview/Recap -->
      <div class="city-overview">
        <div class="overview-stats">
          <div class="stat days">
            <i class="fas fa-calendar-day"></i>
            <span>{{ city.days }} Days</span>
          </div>
          <div class="stat activities">
            <i class="fas fa-list"></i>
            <span>{{ totalActivities }} Activities</span>
          </div>
          <div class="stat meal">
            <i class="fas fa-utensils"></i>
            <span>Avg Meal: {{ averageMealPrice }}</span>
          </div>
          <div class="stat hotel">
            <i class="fas fa-bed"></i>
            <span>Hotel: {{ averageAccommodationPrice }}</span>
          </div>
          <div class="stat hostel">
            <i class="fas fa-bed"></i>
            <span>Hostel: {{ averageHostelPrice }}</span>
          </div>
          <div class="stat total">
            <i class="fas fa-euro-sign"></i>
            <span>Total: {{ totalCityCost }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showActivities" class="activities-list-inline">
        <div v-for="activity in allActivities" :key="activity.time" class="activity-item-inline" :class="getActivityClass(activity.description)">
          <i :class="getActivityIcon(activity.description)"></i>
          <span>{{ activity.description }} - {{ activity.price || 'Free' }}</span>
        </div>
      </div>
    </transition>

    <transit-activity 
      v-if="nextCityTransit"
      :transit="nextCityTransit"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
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
    }
  },
  setup(props) {
    const allActivities = computed(() => {
      return props.city.daysDetails.flatMap(day => day.activities)
    })

    const totalActivities = computed(() => {
      return allActivities.value.length
    })

    const mealPrices = computed(() => {
      return allActivities.value
        .filter(activity => 
          activity.description.includes('Breakfast') || 
          activity.description.includes('Lunch') || 
          activity.description.includes('Dinner') || 
          activity.description.includes('Snack') || 
          activity.description.includes('Coffee')
        )
        .map(activity => parseFloat(activity.price.replace('€', '')))
    })

    const averageMealPrice = computed(() => {
      const prices = mealPrices.value
      const total = prices.reduce((sum, price) => sum + price, 0)
      return prices.length ? `€${(total / prices.length).toFixed(2)}` : 'N/A'
    })

    const averageAccommodationPrice = computed(() => {
      return props.city.accommodation ? props.city.accommodation.pricePerNight : 'N/A'
    })

    const averageHostelPrice = computed(() => {
      return props.city.hostel ? props.city.hostel.pricePerNight : 'N/A'
    })

    const totalCityCost = computed(() => {
      let total = 0
      allActivities.value.forEach(activity => {
        if (activity.price) {
          total += parseFloat(activity.price.replace('€', ''))
        }
      })
      total += parseFloat(props.city.accommodation.pricePerNight.replace('€', '')) * props.city.days
      if (props.city.hostel) {
        total += parseFloat(props.city.hostel.pricePerNight.replace('€', '')) * props.city.days
      }
      props.city.otherCosts.forEach(cost => {
        total += parseFloat(cost.price.replace('€', ''))
      })
      return `€${total}`
    })

    const getActivityIcon = (description) => {
      if (description.includes('Breakfast') || description.includes('Lunch') || description.includes('Dinner') || description.includes('Snack') || description.includes('Coffee')) {
        return 'fas fa-utensils'
      } else if (description.includes('Visit') || description.includes('Explore') || description.includes('Museum')) {
        return 'fas fa-monument'
      } else if (description.includes('Bookstore')) {
        return 'fas fa-book'
      } else if (description.includes('Hotel')) {
        return 'fas fa-bed'
      } else if (description.includes('Transport')) {
        return 'fas fa-bus'
      } else if (description.includes('Souvenirs')) {
        return 'fas fa-gift'
      } else {
        return 'fas fa-map-marker-alt'
      }
    }

    const getActivityClass = (description) => {
      if (description.includes('Breakfast') || description.includes('Lunch') || description.includes('Dinner') || description.includes('Snack') || description.includes('Coffee')) {
        return 'food'
      } else if (description.includes('Visit') || description.includes('Explore') || description.includes('Museum')) {
        return 'attraction'
      } else if (description.includes('Bookstore')) {
        return 'shopping'
      } else {
        return 'other'
      }
    }

    const showActivities = ref(false);

    const toggleActivities = () => {
      showActivities.value = !showActivities.value;
    };

    return {
      allActivities,
      totalActivities,
      averageMealPrice,
      averageAccommodationPrice,
      averageHostelPrice,
      totalCityCost,
      getActivityIcon,
      getActivityClass,
      showActivities,
      toggleActivities
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
  border-radius: 12px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--border-color);
}

.city-main-info {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.city-overview {
  display: flex;
  flex-direction: column;
}

.overview-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
  padding: 0.3rem;
  background-color: #fffaf0;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-size: 0.7rem;
  color: #333;
}

.stat.days { background-color: #ffebcd; }
.stat.activities { background-color: #ffe4e1; }
.stat.meal { background-color: #e0ffff; }
.stat.hotel { background-color: #e6e6fa; }
.stat.hostel { background-color: #f0e68c; }
.stat.total { background-color: #f5deb3; }

.activities-list-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.3rem;
}

.activity-item-inline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem;
  border-radius: 6px;
  font-size: 0.7rem;
  color: #333;
}

.activity-item-inline.food { background-color: #ffebcd; }
.activity-item-inline.attraction { background-color: #ffe4e1; }
.activity-item-inline.shopping { background-color: #e0ffff; }
.activity-item-inline.other { background-color: #f5f5f5; }

.collapse-icon {
  font-size: 0.8rem;
  color: #999;
  transition: transform 0.3s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
