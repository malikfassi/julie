<template>
    <header>
        <h1>Italy Travel Itinerary</h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Italy_Flag_Map.png" alt="Italy Trip Overview">
    </header>
</template>

<script>
export default {
  name: 'headerComponent',
  props: {
    city: {
      type: Object,
      required: false
    },
    cities: {
      type: Array,
      required: false
    },
    costs: {
      type: Array,
      required: false
    },
    totalCost: {
      type: String,
      required: false
    }
  }
}
</script>
