import { useState, useEffect, useContext } from 'react';
import api from '../api';
import EventCard from '../components/events/EventCard';
import EventForm from '../components/events/EventForm';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events?upcoming=true');
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleNewEvent = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="dashboard">
      <h1>Upcoming Events</h1>
      {user?.role === 'organizer' && (
        <button onClick={handleNewEvent}>
          {showForm ? 'Cancel' : 'Create New Event'}
        </button>
      )}
      {showForm && <EventForm onSuccess={() => {
        setShowForm(false);
        // Refresh events
      }} />}
      <div className="events-grid">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}