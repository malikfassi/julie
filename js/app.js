import { rome } from '../data/rome.js';
import { florence } from '../data/florence.js';
import { venice } from '../data/venice.js';
import { milan } from '../data/milan.js';
import { lakeComo } from '../data/lake-como.js';
import { turin } from '../data/turin.js';
import { bologna } from '../data/bologna.js';

new Vue({
    el: '#app',
    data: {
        cities: [rome, florence, venice, milan, lakeComo, turin, bologna],
        costs: [
            { type: 'Accommodation', details: ['Hostels: €420', 'Airbnb: €1,040', 'Total: €1,460'] },
            { type: 'Transportation', details: ['Between Cities: €200', 'Local Transport: €100', 'Total: €300'] },
            { type: 'Food', details: ['Breakfast: €135', 'Lunch: €405', 'Dinner: €540', 'Snacks/Coffee: €270', 'Total: €1,350'] },
            { type: 'Activities and Entrance Fees', details: ['Museums and Attractions: €540', 'Local Experiences: €540', 'Total: €1,080'] },
            { type: 'Miscellaneous Expenses', details: ['Souvenirs, unexpected costs: €270'] }
        ],
        totalCost: '€4,460'
    },
    methods: {
        calculateTotalCost() {
            let total = 0;
            this.cities.forEach(city => {
                city.daysDetails.forEach(day => {
                    day.activities.forEach(activity => {
                        total += parseFloat(activity.price.replace('€', ''));
                    });
                });
            });
            this.totalCost = `€${total + 4460}`; // Add existing costs
        }
    },
    mounted() {
        this.calculateTotalCost();
    }
});
