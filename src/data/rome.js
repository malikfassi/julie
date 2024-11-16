export const rome = {
    id: 'rome',
    name: 'Rome',
    days: 5,
    suggestedNeighborhood: 'Trastevere',
    accommodation: {
        type: 'Hotel',
        pricePerNight: '€100'
    },
    hostel: {
        pricePerNight: '€40'
    },
    otherCosts: [
        { description: 'Local Transport', price: '€50' },
        { description: 'Souvenirs', price: '€30' }
    ],
    daysDetails: [
        {
            activities: [
                { time: 'Breakfast', description: 'Bar San Calisto', price: '€3' },
                { time: 'Morning Visit', description: 'Colosseum and Roman Forum', price: '€16' },
                { time: '11 AM Coffee', description: 'Sant’Eustachio Il Caffè', price: '€4' },
                { time: 'Bookstore', description: 'Libreria Feltrinelli', price: '€0' },
                { time: 'Lunch', description: 'Trattoria Da Enzo al 29', price: '€20' },
                { time: 'Afternoon Activity', description: 'Explore Piazza Navona and Pantheon', price: '€0' },
                { time: 'Museum', description: 'Capitoline Museums', price: '€15' },
                { time: 'Midday Snack', description: 'Gelateria del Teatro', price: '€4' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg'
        },
        {
            activities: [
                { time: 'Breakfast', description: 'Pasticceria Regoli', price: '€3' },
                { time: 'Morning Visit', description: 'Campo de’ Fiori Market', price: '€0' },
                { time: '11 AM Coffee', description: 'Antico Caffè Greco', price: '€4' },
                { time: 'Bookstore', description: 'Libreria Fahrenheit 451', price: '€0' },
                { time: 'Lunch', description: 'Osteria da Fortunata', price: '€18' },
                { time: 'Afternoon Activity', description: 'Visit Trastevere neighborhood', price: '€0' },
                { time: 'Museum', description: 'Palazzo Doria Pamphilj', price: '€12' },
                { time: 'Midday Snack', description: 'Supplì at I Supplì', price: '€3' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Campo_de%27_Fiori%2C_Rome.jpg'
        },
        {
            activities: [
                { time: 'Breakfast', description: 'Pasticceria De Bellis', price: '€3' },
                { time: 'Morning Visit', description: 'Appian Way and Catacombs', price: '€8' },
                { time: '11 AM Coffee', description: 'Caffè Sant’Eustachio', price: '€4' },
                { time: 'Bookstore', description: 'Libreria del Viaggiatore', price: '€0' },
                { time: 'Lunch', description: 'Ristorante Da Francesco', price: '€20' },
                { time: 'Afternoon Activity', description: 'Explore Jewish Ghetto', price: '€0' },
                { time: 'Museum', description: 'Museo Ebraico di Roma', price: '€11' },
                { time: 'Midday Snack', description: 'Cannoli at Pasticceria Boccione', price: '€4' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Appian_Way.jpg'
        }
    ]
};
