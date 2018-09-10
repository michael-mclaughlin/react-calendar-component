import React, { Component } from 'react';
import Calendar from "./components/Calendar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
                <h1 id="react-calendar" className="react-calendar-header"> Mike's <strong>Calendar</strong></h1>
        </header>
        <section id="calendar-parent-section" className="calendar-parent-section">
            <Calendar/>
        </section>
      </div>
    );
  }
}

export default App;
