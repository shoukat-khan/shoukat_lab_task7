let eventIdCounter = 1;
let userIdCounter = 1;
const events = [];
const users = [];

class Event {
  constructor(name, description, date, time, category, reminderTime) {
    this.id = eventIdCounter++;
    this.name = name;
    this.description = description;
    this.date = date;
    this.time = time;
    this.category = category;
    this.reminderTime = reminderTime;
    this.reminderSent = false;
  }
}

class User {
  constructor(username, password) {
    this.id = userIdCounter++;
    this.username = username;
    this.password = password;
    this.events = [];
  }

  createEvent(name, description, date, time, category, reminderTime) {
    const newEvent = new Event(name, description, date, time, category, reminderTime);
    this.events.push(newEvent);
    return newEvent;
  }

  getEvents(filter = {}) {
    return this.events.filter(event => {
      if (filter.category && event.category !== filter.category) return false;
      if (filter.date && event.date !== filter.date) return false;
      if (filter.reminderSent !== undefined && event.reminderSent !== filter.reminderSent) return false;
      return true;
    }).sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
  }

  setReminder(eventId) {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      setTimeout(() => {
        event.reminderSent = true;
        console.log(`Reminder: ${event.name} is happening soon!`);
      }, new Date(event.date + ' ' + event.time) - new Date() - event.reminderTime);
    }
  }
}

// Authenticate users based on username and password
function authenticateUser(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Create a new user
function createUser(username, password) {
  const newUser = new User(username, password);
  users.push(newUser);
  return newUser;
}

module.exports = { Event, User, createUser, authenticateUser };
