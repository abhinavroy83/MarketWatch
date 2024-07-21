import { FaWifi } from "react-icons/fa";
import { MdOutlineHeatPump } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { MdPool } from "react-icons/md";
import { PiPark } from "react-icons/pi";
import { LuParkingCircle } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { MdLocalLaundryService } from "react-icons/md";
import { GiElevator } from "react-icons/gi";
import { GiGlassCelebration } from "react-icons/gi";
import pool from "../assets/pool.png";
import garbage from "../assets/garbage.png";
import washing from "../assets/washing.png";
// import wifi from "../assets/wifi.png";
import gym from "../assets/gym.png";
import parking from "../assets/parking.png";
import visitors from "../assets/visitors.png";
import waterheater from "../assets/waterheater.png";
import security from "../assets/security.png";
import power from "../assets/power.png";

const amenityIcons = {
  "Gym/Fitness Center": gym,
  "Swimming Pool": pool,
  "Car Park": parking,
  "Visitors Parking": visitors,
  "Power Backup": power,
  "Garbage Disposal": garbage,
  "Private Lawn": PiPark,
  "Water Heater Plant": waterheater,
  "Security System": security,
  "Laundry Service": washing,
  Elevator: GiElevator,
  "Club House": GiGlassCelebration,
};

export default amenityIcons;
