import React from 'react'
import HOC from '../HOC';
import axios from 'axios';
import Adduser from './AddUser';
import { HOSTURL } from '../../utils/hostURL';
import toast, { Toaster } from "react-hot-toast";

const AllUsers = () => {
    const [appusers, setappusers] = React.useState([]);
    const [doreload, setdoreload] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        async function getPosts() {
            const request = await axios.get(`${HOSTURL}allusers/`);
            setappusers(request?.data);
          }
        getPosts();
      }, [ doreload]);

const handleOpen=()=>{
    setOpen(!open)
}
const handlereload=()=>{
    setdoreload(!doreload)
}
const handleNotify=(message)=>{
    toast(message)
}

  return (
    <HOC>
    <div className="container px-10 py-16 sm:py-32">
    <Adduser open={open} handleOpen={handleOpen} handlereload={handlereload} handleNotify={handleNotify}/>
    <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#FBBF24",
            color: "#fff",
          },
        }}
      />
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All Users in App</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
          suspendisse.
        </p>
        <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handleOpen}
                className="rounded-md bg-amber-500 px-3 py-2 w-full text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Add a new User
              </button>
            </div>
      </div>
      <ul  className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        {appusers?.map((person) => (
          <li key={person.username}>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src='https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png' alt="" />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Name: {person.username}</h3>
                <p className="text-sm font-semibold leading-6 text-amber-500 font-bold">Phone: {person.phone}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
          
  </HOC>
  )
}

export default AllUsers