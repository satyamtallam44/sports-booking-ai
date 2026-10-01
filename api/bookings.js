import {createClient} from "@supabase/supabase-js";

console.log("SUPABASE_URL exists:", !!process.env.SUPABASE_URL);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY exists:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
     if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Bookings API is running",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
    try {
        const {
            academy,
            sport,
            date,
            time,
            duration,
            name,
            phone,
        } = req.body;
        const { data } = await supabase.from("bookings").insert([
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
      return res.status(200).json({
        success: true,
        message: "Booking created successfully",
        booking: data,
      });
    } catch(error) {
        console.error("Server error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}