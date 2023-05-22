import React from "react";
import ImageOne from "../images/preauthscreen.png";
import { Link } from "react-router-dom";
const PreAuth = () => {
  return (
    <div className="bg-hero-pattern min-h-full flex flex-col justify-center">
      <div className="h-max flex md:flex-row flex-col justify-center items-center gap-6 md:gap-4">
        <div className="sm:container  text-white  flex flex-col justify-center">
        <div className="ml-[4.25rem] flex flex-row text-left text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

        <p className="text-white ml-1">Shopee</p>
      </div>
          <h1 className="lg:text-8xl ml-16 md:text-6xl text-3xl">
            Please your eyes on the{" "}
            <span className="text-amber-400"> trending items</span> at Shopee{" "}
          </h1>
          <p className="ml-16 mt-7">
            Use your vouchers available for you to get a lot of discounts on
            items
          </p>
        </div>
        <div className="mr-12">
          <img
            src={ImageOne}
            alt="Business"
            className="w-[20rem] md:w-[35rem]"
          />
          <Link to='/login'>
                  <button
          type="button"
          className="rounded-md w-full mt-7 bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Get Started
        </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PreAuth;
