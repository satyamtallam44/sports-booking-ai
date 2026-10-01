import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    academy: "",
    sport: "Badminton",
    date: "",
    time: "",
    duration: "1 hour",
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/bookings", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    // if (response.ok) {
    //   throw new Error(`HTTP error: ${response.status}`);
    // }
    const data = await response.json();
    console.log("data", data);
  };

  return (
    <div className="app">
      <div className="booking-card">
        <h1>🏸 AI Court Booking</h1>
        <p className="subtitle">
          Tell us what you want. Our AI will contact the academy.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Academy</label>
          <select
            name="academy"
            value={form.academy}
            onChange={handleChange}
            required
          >
            <option value="">Select academy</option>
            <option value="Academy A">Academy A</option>
            <option value="Academy B">Academy B</option>
          </select>

          <label>Sport</label>
          <select
            name="sport"
            value={form.sport}
            onChange={handleChange}
          >
            <option value="Badminton">Badminton</option>
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
            <option value="Pickleball">Pickleball</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <label>Duration</label>
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
          >
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
          </select>

          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">
            📞 Book with AI
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;