<template>
  <div class="transit-activity">
    <div class="transit-header">
      <h3>{{ transit.type }} from {{ transit.from }} to {{ transit.to }}</h3>
      <span class="transit-duration">{{ transit.duration }}</span>
    </div>
    <div class="transit-details">
      <p>{{ transit.details }}</p>
      <span class="transit-price">{{ transit.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransitActivity',
  props: {
    transit: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.transit-activity {
  background-color: #f5f5f5;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  border-left: 4px solid #4a90e2;
}

.transit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transit-duration {
  color: #666;
  font-weight: bold;
}

.transit-details {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.transit-price {
  color: #2ecc71;
  font-weight: bold;
}
</style>
