<template>
  <div class="costs-overview">
    <div class="costs-header">
      <h2>Trip Budget Overview</h2>
      <div class="total-cost">{{ totalCost }}</div>
    </div>

    <div class="costs-grid">
      <div v-for="cost in costs" :key="cost.type" class="cost-category">
        <div class="category-header">
          <h3>{{ cost.type }}</h3>
          <span class="category-total">{{ getCategoryTotal(cost) }}</span>
        </div>
        <ul class="cost-details">
          <li v-for="detail in cost.details" :key="detail">
            {{ detail }}
          </li>
        </ul>
      </div>
    </div>

    <div class="costs-footer">
      <p class="note">
        <i class="fas fa-info-circle"></i>
        These estimates are based on average costs and can vary depending on personal preferences and seasonal changes.
      </p>
    </div>
  </div>
</template>

<style scoped>
.costs-overview {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.costs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.costs-header h2 {
  color: #2c3e50;
  margin: 0;
}

.total-cost {
  background-color: #2ecc71;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: bold;
}

.costs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.cost-category {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h3 {
  color: #4a90e2;
  margin: 0;
}

.category-total {
  color: #2ecc71;
  font-weight: bold;
}

.cost-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cost-details li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.cost-details li:last-child {
  border-bottom: none;
}

.costs-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
}

.note {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}
</style>

<script>
export default {
  name: 'CostsOverview',
  props: {
    costs: {
      type: Array,
      required: true
    },
    totalCost: {
      type: String,
      required: true
    }
  },
  methods: {
    getCategoryTotal(cost) {
      const total = cost.details.find(detail => detail.includes('Total:'))
      return total || cost.details[cost.details.length - 1]
    }
  }
}
</script>
