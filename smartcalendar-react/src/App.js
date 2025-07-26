import './App.css';
import './firebase'; // Initialize Firebase

function App() {
  return (
    <div className="container">
      <header>
        <h1>SmartCalendar.Life</h1>
        <p>Simplify your scheduling and organize your life</p>
      </header>
      
      <main>
        <section>
          <h2>Welcome to SmartCalendar.Life</h2>
          <p>This is a placeholder website ready for Firebase deployment.</p>
          <p><em>🚀 Currently under active development - AI-powered academic calendar coming soon!</em></p>
          
          <div className="feature">
            <h3>Easy Scheduling</h3>
            <p>Schedule events, set reminders, and organize your calendar with just a few clicks.</p>
          </div>
          
          <div className="feature">
            <h3>Smart Notifications</h3>
            <p>Get timely notifications about upcoming events and never miss an important date.</p>
          </div>
          
          <div className="feature">
            <h3>Calendar Sharing</h3>
            <p>Share your calendar with friends and family to coordinate schedules efficiently.</p>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <a href="#" className="cta-button">Get Started</a>
          </div>
        </section>
      </main>
      
      <footer>
        <p>&copy; 2025 SmartCalendar.Life. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
