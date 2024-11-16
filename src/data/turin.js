export const turin = {
    id: 'turin',
    name: 'Turin',
    days: 3,
    accommodation: {
        type: 'Hotel',
        pricePerNight: '€80'
    },
    hostel: {
        pricePerNight: '€30'
    },
    otherCosts: [
        { description: 'Local Transport', price: '€30' },
        { description: 'Souvenirs', price: '€20' }
    ],
    daysDetails: [
        {
            activities: [
                { time: 'Breakfast', description: 'Caffè Mulassano', price: '€5' },
                { time: 'Morning Visit', description: 'Mole Antonelliana and National Cinema Museum', price: '€15' },
                { time: '11 AM Coffee', description: 'Caffè Torino', price: '€3' },
                { time: 'Bookstore', description: 'Libreria Luxemburg', price: '€0' },
                { time: 'Lunch', description: 'Ristorante Consorzio', price: '€20' },
                { time: 'Afternoon Activity', description: 'Explore Piazza Castello', price: '€0' },
                { time: 'Museum', description: 'Egyptian Museum', price: '€10' },
                { time: 'Midday Snack', description: 'Gianduiotti at Guido Gobino', price: '€5' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Mole_Antonelliana.jpg'
        }
    ]
};
