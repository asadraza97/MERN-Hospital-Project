import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AppointmentForm = () =>{
    const [firstname, setFirstname] =useState("")
    const [lastname, setLastname] =useState("")
    const [email, setEmail] =useState("")
    const [phone, setPhone] =useState("")
    const [dob, setDob] =useState("")
    const [nic, setNic] =useState("")
    const [gender, setGender] =useState("") 
    const [appointmentDate, setAppointmentDate] =useState("")
    const [department, setDepartment] =useState("")
    const [doctorFirstname, setDoctorFirstname] =useState("")
    const [doctorLastname, setDoctorLastname] =useState("")
    const [address, setAddress] =useState("")
    const [hasVisited, sethasVisited] =useState("")

    const departmentsArray = [
        
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",]

        const navigateTo = useNavigate()
        const [doctors, setDoctors] =useState([]);
        useEffect(()=>{
            const fetchDoctors = async()=>{
                const {data} = await axios.get("http://localhost:4000/api/v1/user/doctors", {withCredentials:true} );
            setDoctors(data.doctors);
            }
            fetchDoctors()
        },[])

        const handlerAppointment = async(e) => {
            e.preventDefault();
            try {
                const hasVisitedBool = Boolean(hasVisited);
                const {data} = await axios.post("http://localhost:4000/api/v1/appointment/post", {
                    firstname,
                    lastname,
                    email,
                    phone,
                    dob,
                    nic, 
                    gender,
                    appointment_date:appointmentDate,
                    department, 
                    doctor_firstname: doctorFirstname,
                    doctor_lastname:doctorLastname,
                    address,
                    hasVisited:hasVisitedBool,
                },{
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            toast.success(data.message);
            navigateTo("/")
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        
    return(
        <>
         <div className="container form-component appointment-form">
           <h2>Appointment</h2>
           <p> Please Sign Up to Continue</p>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa distinctio consectetur sequi unde cupiditate iure!</p>
           <form onSubmit={handlerAppointment}>
            <div>
                <input type="text" placeholder="First Name" value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastname} onChange={(e)=> setLastname(e.target.value)} />
            </div>

            <div>
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            
                <input type="number" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
            </div>
            <div>
            <input type="number" placeholder="NIC" value={nic} onChange={(e)=> setNic(e.target.value)} />
            <input type="date" placeholder="Date of Birth" value={dob} onChange={(e)=> setDob(e.target.value)} />
           
                
            </div>
            <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input type="date" placeholder="Appointment Date" value={appointmentDate} onChange={(e)=>{
                setAppointmentDate(e.target.value)
            }} />
            </div>

            <div>
                <select value={department} onChange={(e)=>{
                    setDepartment(e.target.value);
                    setDoctorFirstname("");
                    setDoctorLastname("");
                }}>
                    {
                        departmentsArray.map((depart, index)=>{

                            return (
                                <option value={depart} key={index}>
                                    {depart}
                                </option>
                            )
                        })
                    }
                </select>

                <select value={`${doctorFirstname} ${doctorLastname}`} onChange={(e)=>{
                    const [firstname, lastname] = e.target.value.split(" ");
                    setDoctorFirstname(firstname);
                    setDoctorLastname(lastname);  
                }} disabled={!department} > <option value="">Select Doctor</option>
                {
                    doctors.filter(doctor=> doctor.doctorDepartment === department).map((doctor, index)=>{
                        return(
                            <option value={`${doctor.firstname} ${doctor.lastname}`} key={index}> {doctor.firstname}{doctor.lastname} </option>
                        )
                    })
                }
                </select>
            </div>

            <textarea rows="10" value={address} onChange={(e)=> {
                setAddress(e.target.value)
            }} placeholder="Address"/>

            <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
            <p style={{marginBottom: 0}}>have you visited before? </p>
            <input type="checkbox" checked={hasVisited} onChange={(e)=>{
                sethasVisited(e.target.checked)
            }} style={{flex : "none", width: "25px"}} />
          </div>
          <div style={{justifyContent: "center", alignItems: "center"}}>
            <button type="submit">Get Appointment</button>
          </div>

           </form>
        </div>


        </>
    )
}

export default AppointmentForm 

            