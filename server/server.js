require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Sports Booking API is running",
  });
});

app.post("/api/bookings", async (req, res) => {
  try {
    console.log("Booking request:", req.body);

    const {
      academy,
      sport,
      date,
      time,
      duration,
      name,
      phone,
    } = req.body;

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          academy,
          sport,
          booking_date: date,
          booking_time: time,
          duration,
          customer_name: name,
          customer_phone: phone,
          status: "PENDING",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to save booking",
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Booking created successfully",
      booking: data,
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});