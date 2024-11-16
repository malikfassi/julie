export const bologna = {
    id: 'bologna',
    name: 'Bologna',
    days: 2,
    accommodation: {
        type: 'Hotel',
        pricePerNight: '€85'
    },
    hostel: {
        pricePerNight: '€30'
    },
    otherCosts: [
        { description: 'Local Transport', price: '€25' },
        { description: 'Souvenirs', price: '€20' }
    ],
    daysDetails: [
        {
            activities: [
                { time: 'Breakfast', description: 'Pasticceria Gamberini', price: '€5' },
                { time: 'Morning Visit', description: 'Two Towers', price: '€5' },
                { time: '11 AM Coffee', description: 'Caffè Terzi', price: '€3' },
                { time: 'Bookstore', description: 'Libreria Coop Zanichelli', price: '€0' },
                { time: 'Lunch', description: 'Trattoria Anna Maria', price: '€20' },
                { time: 'Afternoon Activity', description: 'Explore Piazza Maggiore', price: '€0' },
                { time: 'Museum', description: 'Museo Civico Archeologico', price: '€10' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bologna_Piazza_Maggiore.jpg'
        }
    ]
};
