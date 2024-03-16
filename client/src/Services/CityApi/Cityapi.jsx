import axios from "axios";

const fetchcity = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/admin/getallcity");
    if (!res) {
      console.log("there is some issue while fetching api");
    }
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export { fetchcity };
