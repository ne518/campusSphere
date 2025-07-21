import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <h3 className="font-bold text-lg">{event.title}</h3>
        <p className="text-gray-600 text-sm">
          {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-gray-800 mt-2">{event.location}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full 
            ${event.category === 'academic' ? 'bg-blue-100 text-blue-800' : 
              event.category === 'cultural' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'}`}>
            {event.category}
          </span>
          <Link 
            to={`/events/${event._id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}