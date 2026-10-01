import {createClient} from "@supabase/supabase-js";


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
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
        const { data } = await supabase.insert([
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
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}