import React from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
const deleteuser = async (_id) => {
  try {
    const dlt = await axios.delete(
      ` https://api.verydesi.com/api/admin/deleteroom/${_id}`
    );
    if (dlt) {
      alert("successfully deleted");
    }
  } catch (error) {
    console.log("some issue while deleting try again", error);
  }
};
function AdminHelpMessage() {
  <tr
    // key={items._id}
    className=" mb-4 "
  >
    <td className="whitespace-nowrap px-4 py-4">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            // src={items.Imgurl[0]}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium text-gray-500">
            {/* {items.Title} */}
          </div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4">
      <div className="text-base text-gray-500">{/* {items.email} */}</div>
    </td>

    <td className="whitespace-nowrap px-8 py-4 text-base text-gray-500">
      {/* {items.Expected_Rooms} */}
    </td>
    {/* <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.address}
        </td> */}
    <td className="whitespace-nowrap px-8 py-4 text-base text-gray-500">
      {/* {items.city} */}
    </td>
    <td className="whitespace-nowrap px-8 py-4 text-base text-gray-500">
      {/* {items.country} */}
    </td>
    <td className="whitespace-nowrap px-8 py-4 text-left text-base font-medium">
      <a href="#" className="text-gray-500 hover:text-indigo-600">
        Edit
      </a>
    </td>
    <td className="px-8 py-4 text-left text-base text-gray-500 hover:text-red-700">
      <button
        className="hover:text-red-600"
        // onClick={() => {
        //   const _id = items._id;
        //   // console.log(_id);
        //   if (confirm("Confirm to delete") == true) {
        //     deleteuser(_id);
        //   } else {
        //     console.log("cancel");
        //   }
        // }}
      >
        Delete
      </button>
    </td>
  </tr>;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <div className="lg:hidden flex items-center text-gray-700 mt-2 text-[16px] font-['udemy-regular'] ">
          {/* <Link to="/admin/dashboard">
            <FaHome size={20} />
          </Link>
          <IoIosArrowForward /> */}
          <p className="text-[16px]">Help</p>
        </div>
        <section className="mx-auto font-['udemy-regular'] w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <p className="text-[20px] font-semibold">Helped Messages</p>
              <p className="mt-1 text-[17px] text-gray-700 font-['udemy-regular']">
                This is list of all messages.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-scroll sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <MdOutlineMeetingRoom size={23} /> */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/nxmtyldoiednbigmryxy.png"
                              }
                              alt=""
                            />
                            Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <MdOutlineEmail size={23} /> */}
                            <img
                              className="h-6 w-6"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/mt0cax1frqy37toddlr6.png"
                              }
                              alt=""
                            />
                            Email
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <TfiMoney size={20} /> */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/fljdbb2rrycts9fmradi.png"
                              }
                              alt=""
                            />
                            Phone Number
                          </div>
                        </th>
                        {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                      >
                        Address
                      </th> */}
                        <th
                          scope="col"
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <FaMapPin size={20} />  */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
                              }
                              alt=""
                            />
                            Messages
                          </div>
                        </th>
                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/g4etlnb8nxgrgxdfusct.png"
                              }
                              alt=""
                            />
                            Edit
                          </div>
                        </th> */}
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <MdDeleteForever size={25} /> */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/ypojptmu0i6hqvvsjd1r.png"
                              }
                              alt=""
                            />
                            Delete
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      name{" "}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <Pagination
          currentPage={currentPage}
          totalRooms={data.length}
          roomsPerPage="8"
          paginate={paginate}
        /> */}
      </AdminDashboard>
    </div>
  );
}

export default AdminHelpMessage;
