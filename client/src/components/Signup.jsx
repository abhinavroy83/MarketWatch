import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import axios from "axios";
import Logo from '../assets/logo.png'
import { logoImageUrl } from "../constants/imageConstants";

function Signup({ isOpen, onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const onSubmit = async (data) => {
		try {
			const res = await axios.post("http://localhost:8000/user/signup", data);
			if (res) {
				alert("signup successfully added");
			}
		} catch (error) {
			console.log(error);
		}
		reset();
	};
	return (
		<div>
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				style={{
					content: {
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 900,
						height: 700,
						border: "none",
						padding: "0",
						backgroundColor: "#FFF",
						boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
					},
					overlay: {
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					},
				}}
			>
				<div className=" w-full flex h-full">
					<div className="bg-slate-800 w-1/2 flex justify-center items-center">
						<div className="text-center">
							<img className="w-[100px] m-auto" src={Logo} />
							<p className=" text-white text-center mt-5 text-3xl">Signup</p>
							<p className=" text-white text-center mt-5 text-sm px-7 text-base/7">Stay Connected With US Add Your Personal Details. For More Details.</p>
							<button
								className="place-items-center items-center rounded-md bg-[#17b19f] px-5 py-2 text-sm font-semibold text-white hover:bg-black/80 mt-5"
								type="submit">
								Sign Up Now! 
							</button>
						</div>
					</div>
					<div className="w-1/2 flex flex-col justify-center items-center">
						<h1 className="text-3xl font-bold text-[#17b19f] mt-3">
							CREATE YOUR ACCOUNT 
						</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mx-10">
								<div className="flex gap-5 mt-5">
									<Input
										label="FirstName"
										Placeholder="First name"
										type="text"
										{...register("firstName", {
											required: "First Name is required",
										})}
										errorMessage={errors.firstName?.message}
									/>
									<Input
										label="Last Name"
										Placeholder="Last name"
										type="text"
										{...register("lastName", { required: "Last Name is required" })}
										errorMessage={errors.lastName?.message}
									/>
								</div>
								<div className="flex flex-col gap-3 mt-3">
									<Input
										label="Email"
										Placeholder="Email"
										type="Email"
										{...register("email", {
											required: "Email is required",
											validate: {
												matchPatern: (value) =>
													/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
														value
													) || "Email address must be a valid address",
											},
										})}
										errorMessage={errors.email?.message}
										className="!w-full"
									/>
									<Input
										label="Password"
										Placeholder="Password"
										type="text"
										{...register("password", { required: "Password is required" })}
										errorMessage={errors.password?.message}
									/>
									<div>
										<Input
										label="Date of Birth"
										Placeholder="Enter Date of Birth"
											type="date"
											{...register("dob", { required: "DOB is required" })}
											className="w-full"
										/>
										{errors.dob && <p>{errors.msg?.dob}</p>}
									</div>
									<div>
										{/* <label>Select a country:</label> */}
										<select className="w-full flex h-10 rounded-md border border-black/0 bg-transparent px-3 py-2 mt-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"{...register("country", { required: true })}>
											<option value="">Country</option>
											<option value="USA">USA</option>
											<option value="India">India</option>
										</select>
										{errors.country && <p className="mt-1 text-xs text-gray-500">Country is required.</p>}
									</div>
									<Input
										label="City"
										Placeholder="Enter City"
										type="text"
										{...register("city", { required: "City is required" })}
										errorMessage={errors.city?.message}
									/>
									<div className="flex gap-3">
										<input type="checkbox"/>
										<label className="w-full">I agree to terms and conditions</label>
									</div>
									<div className="text-center">
									<button
										className="place-items-center items-center inline-flex rounded-md bg-[#17b19f] px-10 py-2 text-[16px] font-semibold text-white hover:bg-black/80"
										type="submit"
									>
										Submit
									</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default Signup;
