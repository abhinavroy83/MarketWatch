import React from "react";
import WebsiteLogo from "../../assets/logo-transparent.png";
import { Link } from "react-router-dom";

export default function Footer() {
  
  // https://marketwatch-e3hc.onrender.com/
  return (
    <div className="mt-9 w-full">
      <div className=" bg-[#0b5e86] font-['udemy-regular']">
        <div className="max-w-[1600px] w-full m-auto flex items-center justify-between pb-3 p-4">
          <div className="">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img
                height={200}
                width={230}
                className="w-50 h-50"
                src={WebsiteLogo}
                alt=""
              />
            </a>
            <div className="lg:max-w-sm">
              <p className="text-[20px] text-white">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <p className="mt-2 text-[20px] text-white">
                Eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae.
              </p>
              {/* <button className="flex rounded-md bg-green-800 mt-4 p-2 px-3 my-4 text-[22px] border-2 border-white text-white shadow-sm hover:bg-green-900 hover:text-white" type="submit">Get Started</button> */}
            </div>
          </div>
          <div className="flex text-[20px] grid-cols-2 gap-5 row-gap-8 mt-5 lg:col-span-4 md:grid-cols-4">
            <div>
              <Link
                to={`/about-us`}
                className="font-semibold tracking-wide text-white"
              >
                About Us
              </Link>
              <ul className="mt-2 space-y-2 text-[20px]">
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    About VeryDesi.com
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Advertise with Us
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Work with us
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-7">
              <p className="font-semibold tracking-wide text-white">
                Quick Links
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Post Ads
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Roommates
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Business Listings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-5 border-t sm:flex-row max-w-[1600px] w-full m-auto">
          <p className="text-[20px] text-white ml-2">
            © Copyright 2024 Lorem Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 sm:mt-0">
            <a
              href="/"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
