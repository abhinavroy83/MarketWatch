import axios from "axios";

const fetchcity = async () => {

   http://api.verydesi.com
  try {
    const res = await axios.get(
      " http://api.verydesi.com/api/admin/getallcity"
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
