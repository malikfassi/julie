export const venice = {
    id: 'venice',
    name: 'Venice',
    days: 3,
    suggestedNeighborhood: 'San Marco',
    accommodation: {
        type: 'Hotel',
        pricePerNight: '€120'
    },
    hostel: {
        pricePerNight: '€45'
    },
    otherCosts: [
        { description: 'Local Transport', price: '€40' },
        { description: 'Souvenirs', price: '€30' }
    ],
    daysDetails: [
        {
            activities: [
                { time: 'Breakfast', description: 'Pasticceria Tonolo', price: '€5' },
                { time: 'Morning Visit', description: 'Doge\'s Palace', price: '€20' },
                { time: '11 AM Coffee', description: 'Caffè Florian', price: '€6' },
                { time: 'Bookstore', description: 'Libreria Acqua Alta', price: '€0' },
                { time: 'Lunch', description: 'Trattoria da Fiore', price: '€25' },
                { time: 'Afternoon Activity', description: 'Gondola Ride', price: '€80' },
                { time: 'Museum', description: 'Peggy Guggenheim Collection', price: '€15' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Venice_Canal.jpg'
        }
    ]
};
