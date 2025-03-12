const express = require('express');
const { createUser, authenticateUser, User, Event } = require('./events');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route to create an event
app.post('/create-event', (req, res) => {
  const { username, password, eventData } = req.body;

  // Authenticate user
  const user = authenticateUser(username, password);
  if (!user) {
    return res.status(401).send('Authentication failed');
  }

  // Create event for the authenticated user
  const { name, description, date, time, category, reminderTime } = eventData;
  const event = user.createEvent(name, description, date, time, category, reminderTime);
  res.status(201).json(event);
});

// Route to get user's events
app.get('/events', (req, res) => {
  const { username, password } = req.query;
  const user = authenticateUser(username, password);
  if (!user) {
    return res.status(401).send('Authentication failed');
  }

  const events = user.getEvents({});
  res.json(events);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
