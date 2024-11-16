export const lakeComo = {
    id: 'lake-como',
    name: 'Lake Como',
    days: 2,
    accommodation: {
        type: 'Hotel',
        pricePerNight: '€130'
    },
    hostel: {
        pricePerNight: '€50'
    },
    otherCosts: [
        { description: 'Local Transport', price: '€20' },
        { description: 'Souvenirs', price: '€15' }
    ],
    daysDetails: [
        {
            activities: [
                { time: 'Breakfast', description: 'Pasticceria Sancassani', price: '€5' },
                { time: 'Morning Visit', description: 'Villa del Balbianello', price: '€10' },
                { time: '11 AM Coffee', description: 'Caffè Bar Sport', price: '€3' },
                { time: 'Bookstore', description: 'Libreria Torriani', price: '€0' },
                { time: 'Lunch', description: 'Ristorante Silvio', price: '€20' },
                { time: 'Afternoon Activity', description: 'Boat Tour', price: '€50' },
                { time: 'Museum', description: 'Museo degli Strumenti per la Navigazione', price: '€5' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Lake_Como.jpg'
        }
    ]
};
