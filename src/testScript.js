const { Event, User, createUser, authenticateUser } = require('./events');

// Create user with the name 'Ali Shoukat Hassan'
const user = createUser('ali_shoukat', 'password123');

// Create an event
const event = user.createEvent('Birthday Party', 'Celebrate Ali\'s birthday', '2025-05-01', '18:00', 'Birthday', 600000);
console.log('Created Event:', event);

// Get user events
const events = user.getEvents({});
console.log('User Events:', events);
