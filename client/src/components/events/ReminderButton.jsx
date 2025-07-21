import { useState, useContext } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AuthContext } from '../../context/AuthContext'
import api from '../../api'

export default function ReminderButton({ eventId }) {
  const [remindAt, setRemindAt] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)

  const handleSetReminder = async () => {
    try {
      await api.post(`/reminders/${eventId}`, {
        remindAt: remindAt.toISOString()
      })
      setIsOpen(false)
    } catch (err) {
      console.error('Failed to set reminder:', err)
    }
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Remind Me
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 p-4 bg-white border rounded shadow-lg w-64">
          <DatePicker
            selected={remindAt}
            onChange={(date) => setRemindAt(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSetReminder}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Set
            </button>
          </div>
        </div>
      )}
    </div>
  )
}