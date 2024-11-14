new Vue({
    el: '#app',
    data: {
        cities: [
            { id: 'rome', name: 'Rome', days: 5, daysDetails: [/* Day details here */] },
            { id: 'florence', name: 'Florence', days: 4, daysDetails: [/* Day details here */] },
            // Add other cities
        ],
        costs: [
            { type: 'Accommodation', details: ['Hostels: €420', 'Airbnb: €1,040', 'Total: €1,460'] },
            { type: 'Transportation', details: ['Between Cities: €200', 'Local Transport: €100', 'Total: €300'] },
            // Add other costs
        ],
        totalCost: '€4,460'
    },
    components: {
        'header-component': { template: '#header-template' },
        'itinerary-overview': { template: '#overview-template', props: ['cities'] },
        'city-section': { template: '#city-template', props: ['city'] },
        'costs-overview': { template: '#costs-template', props: ['costs', 'totalCost'] }
    }
});