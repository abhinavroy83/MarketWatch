import axios from "axios";

const fetchcity = async () => {

   https://marketwatch-e3hc.onrender.com
  try {
    const res = await axios.get(
      " https://marketwatch-e3hc.onrender.com/api/admin/getallcity"
    );
    if (!res) {
      console.log("there is some issue while fetching api");
    }
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export { fetchcity };
