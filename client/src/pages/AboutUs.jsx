import React from "react";
// import WebsiteLogo from "../../../assets/website_logo.png";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { BiCalendarEvent } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";


function AboutUs() {
    return (
        <div className="mt-48">
            <div className="bg-[#0b5e86] font-['udemy-bold'] items-center w-full m-auto flex flex-col justify-center p-10">
                <p className="text-[22px] text-[#cc9724] mt-10">Welcome to Very Desi</p>
                <p className="text-[66px] text-white mt-2 font-['udemy-bold'] leading-[63px]">LOREM IPSUM IS DUMMY TEXT<br></br>OF PRINTING AND YPESETTING</p>
                {/* <p className="text-[60px] text-white font-['udemy-bold'] mt-0">OF PRINTING AND TYPESETTING</p> */}
                {/* <p className="text-[60px] text-white font-['udemy-bold'] mt-0">OF PRINTING AND YPESETTING</p> */}

                <p className="text-[22px] text-white text-center font-['udemy-regular'] leading-[27px]">Lorem Ipsum is simply printing and typesetting industry. <p>Lorem Ipsum has been the standard dummy text</p></p>
                <div className="grid grid-cols-4 gap-4 flex-wrap w-auto m-auto justify-center mt-[4.5rem] max-w-[860px] cursor-pointer">

                    <div className="">
                        <div className="bg-white group transition duration-300 text-center flex flex-col items-center rounded-lg hover:scale-105 shadow-md shadow-black hover:shadow-xl hover:bg-slate-100 w-[150px] object-cover border border-black justify-center h-[150px]">
                            {/* <img
                className="w-[4.9rem] h-15"
                src={`https://cdn-icons-png.flaticon.com/512/751/751683.png`}
                alt="logo"
              /> */}
                            <MdMeetingRoom size={45} className="group-hover:rotate-[360deg] transition-transform" />

                            <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-['udemy-regular']">
                                Rooms
                            </h1>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-white group transition duration-300 text-center flex flex-col items-center rounded-lg hover:scale-105 shadow-md shadow-black hover:shadow-xl hover:bg-slate-100 w-[150px] object-cover border border-black justify-center h-[150px]">
                            {/* <img
              className="w-[4.9rem] h-15"
              src={`https://cdn-icons-png.flaticon.com/512/3688/3688609.png`}
              alt="logo"
            /> */}
                            <MdWorkHistory size={45} className="group-hover:rotate-[360deg] transition-transform" />

                            <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-['udemy-regular']">
                                Jobs
                            </h1>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-white group transition duration-300 text-center flex flex-col items-center rounded-lg hover:scale-105 shadow-md shadow-black hover:shadow-xl hover:bg-slate-100 w-[150px] object-cover border border-black justify-center h-[150px]">
                            {/* <img
              className="w-[6.4rem] h-13"
              src={`https://img.freepik.com/premium-vector/upcoming-events-announcement-megaphone-label-loudspeaker-speech-bubble_123447-5297.jpg`}
              alt="logo"
            /> */}
                            <BiCalendarEvent size={45} className="group-hover:rotate-[360deg] transition-transform" />

                            <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-['udemy-regular']">
                                Events
                            </h1>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-white group transition duration-300 text-center flex flex-col items-center rounded-lg shadow-md hover:scale-105 shadow-black hover:shadow-xl hover:bg-slate-100 w-[150px] object-cover border border-black justify-center h-[150px]">
                            {/* <img
              className="w-[4.9rem] h-15"
              src={`https://www.freeiconspng.com/thumbs/movie-icon/movie-icon-6.png`}
              alt="logo"
            /> */}
                            <BiCameraMovie size={45} className="group-hover:rotate-[360deg] transition-transform" />
                            <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-['udemy-regular']">
                                Movies
                            </h1>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="font-['udemy-regular'] rounded-md bg-[#cc9724] my-5 mt-12 px-7 py-4 text-[20px] self-center text-white shadow-sm hover:bg-[#cc9724]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Get Started For Free
                </button>
            </div>

            <div className="">
                <p className="text-[48px] text-gray-700 mt-20 font-['udemy-bold'] items-center w-full m-auto flex flex-col justify-center">
                    For next event
                </p>
                <div className="font-['udemy-regular'] grid grid-cols-4 gap-7 flex-wrap w-auto m-auto justify-center max-w-[1380px] mt-10 mb-20">
                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100 transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100 transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100  transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100  transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100  transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100  transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100  transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative cursor-pointer bg-gray-100 hover:bg-slate-100  transition duration-300 bg-[url('https://i.postimg.cc/1XnSFhWx/pngtree-students-girl-sitting-with-pc-png-image-6391983-3.png')] bg-[length:60%] bg-no-repeat bg-right-bottom group flex flex-col items-center rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 hover:bg-slate-100 h-[350px]">
                            {/* <img
              className="absolute right-0 bottom-0 h-15 "
              src={`https://png.pngtree.com/png-vector/20221027/ourmid/pngtree-students-girl-sitting-with-pc-png-image_6391983.png`}
              alt="logo"
            /> */}
                            <h1 className="text-[24px] text-gray-800 mt-7 font-['udemy-bold'] px-7 leading-[1.8rem]">
                                Lorem Ipsum is simply dummy text of the printing
                            </h1>
                            <p className="leading-5 mt-3 text-[18px] px-7">Lorem Ipsum has been the industry's standard</p>
                        </div>
                    </div>

                </div>
                <div className="bg-slate-200">
                    <div className="w-auto m-auto justify-center max-w-[1380px]">
                        <div className="w-full flex p-20 pl-0">
                            <div>
                                <p className="text-[48px] text-gray-700 font-['udemy-bold'] m-auto flex flex-col">
                                    Planning event?
                                </p>
                                <p className="text-[22px] mt-0 leading-7 text-gray-800 font-['udemy-bold'] m-auto flex flex-col">
                                    Lorem Ipsum is simply dummy text of<br></br>lorem Ipsum is simply dummy text
                                </p>
                                <p className="text-[18px] leading-5 text-gray-700 font-['udemy-regular'] m-auto flex flex-col mt-3">
                                    Lorem Ipsum is simply dummy text of<br></br>lorem Ipsum is simply
                                </p>
                                <button
                                    type="submit"
                                    className="font-['udemy-regular'] rounded-md bg-[#cc9724] my-5 mt-10 px-7 py-4 text-[20px] self-center text-white shadow-sm hover:bg-[#cc9724]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" >
                                    Get Started For Free
                                </button>

                            </div>
                            <div>
                                Right content
                            </div>
                        </div>
                    </div>
                </div>
           
             <div>
               <div className="font-['udemy-regular'] pt-20">
               <p className="text-[48px] text-gray-700 font-['udemy-bold'] m-auto flex flex-col items-center">
                 Lorem Ipsum is simply dummy text 
               </p>
               <p className="text-[22px] mt-0 leading-7 text-gray-800 font-['udemy-regular'] m-auto flex flex-col items-center">
                 Lorem Ipsum is simply dummy text of lorem Ipsum is simply dummy
               </p>

            <div className="grid grid-cols-3 gap-[10rem] gap-y-20 flex-wrap w-auto m-auto justify-center max-w-[1380px] mt-20 mb-20 items-center">
               <div className="h-[350px] font-['udemy-bold'] cursor-pointer">
               <img
                src="https://www.workitdaily.com/media-library/image.jpg?id=19218255&width=980&quality=85"
                alt=""
                className="rounded-lg w-full h-[150px] object-cover"
               />
               <p className="text-[22px] leading-7 text-gray-800 m-auto items-center ml-4 mt-4">
                 Lorem Ipsum is simply dummy text of lorem 
               </p>
               <p className="text-[18px] mt-2 leading-7 text-gray-800 m-auto items-center font-['udemy-regular'] ml-4">
                 Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy
               </p>
               <p className="text-[18px] mt-4 leading-7 text-gray-800 m-auto inline-block border-b-2 border-[#0b5e86] hover:text-[#0b5e86] ml-4">
                 Lorem Ipsum dummy.
               </p>
               </div>

               <div className="h-[350px] font-['udemy-bold'] cursor-pointer">
               <img
                src="https://www.andmeetings.com/wp-content/uploads/2019/08/Six-types-of-people-in-a-meeting.jpg"
                alt=""
                className="rounded-lg w-full h-[150px] object-cover"
               />
               <p className="text-[22px] leading-7 text-gray-800 m-auto items-center ml-4 mt-4">
                 Lorem Ipsum is simply dummy text of lorem 
               </p>
               <p className="text-[18px] mt-2 leading-7 text-gray-800 m-auto items-center font-['udemy-regular'] ml-4">
                 Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy
               </p>
               <p className="text-[18px] mt-4 leading-7 text-gray-800 m-auto inline-block border-b-2 border-[#0b5e86] hover:text-[#0b5e86] ml-4">
                 Lorem Ipsum dummy.
               </p>
               </div>

               <div className="h-[350px] font-['udemy-bold'] cursor-pointer">
               <img
                src="https://viewpointecenter.com/wp-content/uploads/2020/08/meeting.jpg"
                alt=""
                className="rounded-lg w-full h-[150px] object-cover"
               />
               <p className="text-[22px] leading-7 text-gray-800 items-center ml-4 mt-4">
                 Lorem Ipsum is simply dummy text of lorem 
               </p>
               <p className="text-[18px] mt-2 leading-7 text-gray-800 items-center font-['udemy-regular'] ml-4">
                 Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy
               </p>
               <p className="text-[18px] mt-4 leading-7 text-gray-800 border-b-2 border-[#0b5e86] hover:text-[#0b5e86] ml-4 inline-block">
                 Lorem Ipsum dummy.
               </p>
               </div>

               <div className="h-[350px] font-['udemy-bold'] cursor-pointer">
               <img
                src="https://www.panopto.com/wp-content/uploads/2020/02/modern-meeting-room-tech-trends-scaled.jpg"
                alt=""
                className="rounded-lg w-full h-[150px] object-cover"
               />
               <p className="text-[22px] leading-7 text-gray-800 items-center ml-4 mt-4">
                 Lorem Ipsum is simply dummy text of lorem 
               </p>
               <p className="text-[18px] mt-2 leading-7 text-gray-800 items-center font-['udemy-regular'] ml-4">
                 Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy
               </p>
               <p className="text-[18px] mt-4 leading-7 text-gray-800 border-b-2 border-[#0b5e86] hover:text-[#0b5e86] ml-4 inline-block">
                 Lorem Ipsum dummy.
               </p>
               </div>

               <div className="h-[350px] font-['udemy-bold'] cursor-pointer">
               <img
                src="https://s3.envato.com/files/276685362/_U0A1400.jpg"
                alt=""
                className="rounded-lg w-full h-[150px] object-cover"
               />
               <p className="text-[22px] leading-7 text-gray-800 items-center ml-4 mt-4">
                 Lorem Ipsum is simply dummy text of lorem 
               </p>
               <p className="text-[18px] mt-2 leading-7 text-gray-800 items-center font-['udemy-regular'] ml-4">
                 Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy
               </p>
               <p className="text-[18px] mt-4 leading-7 text-gray-800 border-b-2 border-[#0b5e86] hover:text-[#0b5e86] ml-4 inline-block">
                 Lorem Ipsum dummy.
               </p>
               </div>

               <div className="h-[350px] font-['udemy-bold'] cursor-pointer">
               <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqEglfjuPX0JDzTf6EEFxF_RHDmJdStuU6KVFdD9QXziqOwZQCF64v4Vf4rNqlvlwLEo&usqp=CAU"
                alt=""
                className="rounded-lg w-full h-[150px] object-cover"
               />
               <p className="text-[22px] leading-7 text-gray-800 items-center ml-4 mt-4">
                 Lorem Ipsum is simply dummy text of lorem 
               </p>
               <p className="text-[18px] mt-2 leading-7 text-gray-800 items-center font-['udemy-regular'] ml-4">
                 Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy
               </p>
               <p className="text-[18px] mt-4 leading-7 text-gray-800 border-b-2 border-[#0b5e86] hover:text-[#0b5e86] ml-4 inline-block">
                 Lorem Ipsum dummy.
               </p>
               </div>

            </div>
               </div>
             </div>   
 
             <div className="bg-slate-200">
                
                    <div className="w-auto m-auto justify-center max-w-[1380px] items-center">
                        <div className="w-full flex p-20 pl-0 items-center justify-center gap-20">
                        <img
                          src="https://media.istockphoto.com/id/514325191/photo/teamwork-makes-the-dream-work.jpg?s=612x612&w=0&k=20&c=R-o4dELulfT4Ztp_r3b4CE8zt8629zwydoTHpEw-bK4="
                          alt=""
                          className="w-[550px] h-[450px]"
                        />
                            <div className="justify-center ">
                                <p className="text-[48px] leading-[3.75rem] text-gray-700 font-['udemy-bold'] m-auto flex flex-col">
                                Lorem Ipsum is simply dummy text lorem Ipsum is simply is simply dummy
                                </p>
                                <p className="text-[18px] leading-5 text-gray-700 font-['udemy-regular'] m-auto flex flex-col mt-6">
                                    Lorem Ipsum is simply dummy text of lorem Ipsum lorem Ipsum lorem Ipsum<br></br>lorem Ipsum is simply
                                </p>
                               <div className="flex gap-3"> 
                                <button
                                    type="submit"
                                    className="font-['udemy-regular'] rounded-md bg-[#cc9724] my-5 mt-5 px-5 py-3 text-[20px] self-center text-white shadow-sm hover:bg-[#cc9724]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" >
                                    Get Started For Free
                                </button>
                                <button
                                    type="submit"
                                    className="font-['udemy-regular'] rounded-md border-2 border-[#0b5e86] text-[#0b5e86] my-5 mt-5 px-5 py-3 text-[20px] self-center shadow-sm hover:bg-[#cc9724]/90 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" >
                                    Get Started For Free
                                </button>
                             </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default AboutUs