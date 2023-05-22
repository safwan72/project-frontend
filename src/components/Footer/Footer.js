import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Footer = () => {
  const links = [
    {
      name: "Address",
      value: "Lorem Ipsum",
      icon: <MapPinIcon className="text-white h-6 w-5" />,
    },
    {
      name: "Call",
      value: "+01234567890",
      icon: <PhoneIcon className="text-white h-6 w-5" />,
    },
    {
      name: "Email",
      value: "demo@gmail.com",
      icon: <EnvelopeIcon className="text-white h-6 w-5" />,
    },
  ];
  return (
    <div className="bg-black py-16 mt-10">
      <div className="container px-16 mx-auto text-white flex flex-col lg:flex-row gap-3 justify-center">
        <div className="col-1 flex-1 text-center lg:text-left mb-4">
          <h1 className="text-2xl">Contact Us</h1>
          {links?.map((item,i) => (
            <div className="flex flex-row my-3 items-center justify-center lg:items-start lg:justify-start" key={i}>
              <div className="mr-2">{item?.icon}</div>
              <div>
                <p>
                  {item?.name}: <span>{item?.value}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-2 flex-1 text-center mb-4">
          <h1 className="text-2xl ">Shopee</h1>
          <p>
            commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non
          </p>
        </div>
        <div className="col-3 flex-1 text-center lg:text-right mb-4">
        <h1 className="text-2xl">BEST PRODUCTS</h1>
          <p>
          dolore eu fugiat <br/>nulla pariatur.<br/> Excepteur sint<br/> occaecat cupidatat non
          </p>
        </div>
      </div>
      <p className="text-orange-200 text-center mt-10 py-8">2023 All Rights Reserved. Design by Safwan</p>
    </div>
  );
};

export default Footer;
