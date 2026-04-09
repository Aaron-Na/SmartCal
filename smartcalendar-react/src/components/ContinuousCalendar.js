import React, { useState } from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Assignment Modal Component
const AssignmentModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date) {
      const [year, month, day] = date.split('-');
      onSubmit({
        title,
        description,
        priority,
        date: `${year}-${parseInt(month) - 1}-${day}` // Convert to 0-based month
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDate('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📝 Add Assignment</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Assignment Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter assignment description (optional)"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Priority *</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="easy">🟢 Easy (Green)</option>
              <option value="medium">🔵 Medium (Blue)</option>
              <option value="high">🔴 High (Red)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Event Modal Component
const EventModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date) {
      const [year, month, day] = date.split('-');
      onSubmit({
        title,
        description,
        priority,
        date: `${year}-${parseInt(month) - 1}-${day}` // Convert to 0-based month
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDate('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📅 Add Event</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description (optional)"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Priority *</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="easy">🟢 Easy (Green)</option>
              <option value="medium">🔵 Medium (Blue)</option>
              <option value="high">🔴 High (Red)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Event Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ContinuousCalendar = ({ onClick }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const today = new Date();

  const handleDateClick = (day, month, year) => {
    const dateKey = `${year}-${month}-${day}`;
    setSelectedDate(dateKey);
    if (onClick) {
      onClick(day, month, year);
    }
  };

  const navigateToToday = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setSelectedDate(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
    
    // Scroll to current month
    setTimeout(() => {
      const currentMonthElement = document.getElementById(`month-${today.getMonth()}`);
      if (currentMonthElement) {
        currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const addAssignment = (assignmentData) => {
    const newAssignment = {
      id: Date.now(),
      type: 'assignment',
      completed: false, // Track completion status
      ...assignmentData
    };
    setAssignments([...assignments, newAssignment]);
    setShowAssignmentModal(false);
  };

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      type: 'event',
      completed: false, // Track completion status
      ...eventData
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
  };

  // Toggle completion status for an assignment or event
  const toggleComplete = (id, type) => {
    if (type === 'assignment') {
      // Find the assignment and flip its completed status
      setAssignments(assignments.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      ));
    } else {
      // Find the event and flip its completed status
      setEvents(events.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      ));
    }
  };

  const getItemsForDate = (day, month, year) => {
    const dateKey = `${year}-${month}-${day}`;
    const dayAssignments = assignments.filter(item => item.date === dateKey);
    const dayEvents = events.filter(item => item.date === dateKey);
    return [...dayAssignments, ...dayEvents];
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isToday = (day, month, year) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day, month, year) => {
    return selectedDate === `${year}-${month}-${day}`;
  };

  const renderMonth = (monthIndex) => {
    const daysInMonth = getDaysInMonth(monthIndex, currentYear);
    const firstDay = getFirstDayOfMonth(monthIndex, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day, monthIndex, currentYear);
      const isSelectedDay = isSelected(day, monthIndex, currentYear);
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${
            isCurrentDay ? 'today' : ''
          } ${
            isSelectedDay ? 'selected' : ''
          }`}
          onClick={() => handleDateClick(day, monthIndex, currentYear)}
        >
          <span className="day-number">{day}</span>
          <div className="assignments">
            {getItemsForDate(day, monthIndex, currentYear).map(item => (
              <div 
                key={item.id} 
                className={`assignment-item priority-${item.priority} ${item.completed ? 'completed' : ''}`}
                title={`${item.type === 'assignment' ? 'Assignment' : 'Event'}: ${item.title}`}
              >
                {/* Checkbox to mark item as complete */}
                <input
                  type="checkbox"
                  className="item-checkbox"
                  checked={item.completed || false}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent date click when checking
                    toggleComplete(item.id, item.type);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className={`item-title ${item.completed ? 'completed-text' : ''}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={monthIndex} id={`month-${monthIndex}`} className="month-container">
        <div className="month-header">
          <h3 className="month-title">{monthNames[monthIndex]} {currentYear}</h3>
        </div>
        <div className="days-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="smart-calendar">
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="header-left">
          <h2 className="year-title">{currentYear}</h2>
          <div className="action-buttons">
            <button className="action-button primary">
              📚 Upload Syllabus
            </button>
            <button className="action-button secondary" onClick={() => setShowAssignmentModal(true)}>
              📝 Add Assignment
            </button>
            <button className="action-button secondary" onClick={() => setShowEventModal(true)}>
              📅 Add Event
            </button>
            <button className="action-button tertiary">
              🤖 Generate Study Plan
            </button>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="nav-button"
            onClick={() => setCurrentYear(currentYear - 1)}
          >
            ← {currentYear - 1}
          </button>
          <button 
            className="today-button"
            onClick={navigateToToday}
          >
            Today
          </button>
          <button 
            className="nav-button"
            onClick={() => setCurrentYear(currentYear + 1)}
          >
            {currentYear + 1} →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-scroll">
        {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <AssignmentModal 
          onClose={() => setShowAssignmentModal(false)}
          onSubmit={addAssignment}
        />
      )}

      {/* Event Modal */}
      {showEventModal && (
        <EventModal 
          onClose={() => setShowEventModal(false)}
          onSubmit={addEvent}
        />
      )}
    </div>
  );
};
