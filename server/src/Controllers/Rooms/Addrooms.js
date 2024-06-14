const Room = require("../../model/room");

const addroom = async (req, res) => {
  try {
    const {
      Title,
      Description,
      Propertytype,
      PostingIn,
      Stay_lease,
      Avaliblity_from,
      Available_to, 
      Day_Available,
      Attchd_Bath,
      Preferred_gender,
      Expected_Rooms,
      Pricemodel,
      Desposite,
      is_room_furnished,
      Amenities_include,
      Vegeterian_prefernce,
      Smoking_policy,
      Pet_friendly,
      Open_house_schedule,
      Imgurl,
      user_name,
      email,
      phone_number,
      address,
      zip_code,
      location,
    } = req.body;
    const UserId = req.user.user._id;
    const postedon = new Date().toISOString().split("T")[0];
    const rooms = new Room({
      UserId,
      postedon,
      Title,
      Description,
      Propertytype,
      PostingIn,
      Stay_lease,
      Avaliblity_from,
      Available_to,
      Day_Available, 
      Attchd_Bath,
      Preferred_gender,
      Expected_Rooms,
      Pricemodel,
      Desposite,
      is_room_furnished,
      Amenities_include,
      Vegeterian_prefernce,
      Smoking_policy,
      Pet_friendly,
      Open_house_schedule,
      Imgurl,
      user_name,
      email,
      phone_number,
      address,
      zip_code,
      location,
    });
    await rooms.save();
    res.json({
      rooms,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addroom;
