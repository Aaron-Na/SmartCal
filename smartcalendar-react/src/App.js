import './App.css';
import './firebase'; // Initialize Firebase
import { ContinuousCalendar } from './components/ContinuousCalendar';

function App() {
  const handleDateClick = (day, month, year) => {
    console.log(`Date clicked: ${month + 1}/${day}/${year}`);
    // TODO: Add assignment/event functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <header className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-6 rounded-t-2xl shadow-lg">
          <h1 className="text-white m-0 text-4xl font-bold">SmartCalendar.Life</h1>
          <p className="mt-2 text-lg">AI-Powered Academic Calendar</p>
          <p className="mt-1 text-sm opacity-90">🚀 Interactive calendar with assignment tracking and AI study planning</p>
        </header>
        
        <main className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
          <div className="h-80vh">
            <ContinuousCalendar onClick={handleDateClick} />
          </div>
        </main>
        
        <footer className="text-center py-4 mt-4 text-gray-600">
          <p>&copy; 2025 SmartCalendar.Life. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
