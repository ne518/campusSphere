import { useState, useContext } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

export default function EventForm({ onSuccess }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'academic'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', formData);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />
      <input
        type="datetime-local"
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      >
        <option value="academic">Academic</option>
        <option value="cultural">Cultural</option>
        <option value="sports">Sports</option>
        <option value="workshop">Workshop</option>
      </select>
      <button type="submit">Create Event</button>
    </form>
  );
}