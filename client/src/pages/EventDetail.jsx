import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ReminderButton from '../components/events/ReminderButton';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <ReminderButton eventId={event._id} />
    </div>
  );
}