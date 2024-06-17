import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dasdboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointment(data.appointment);
      } catch (error) {
        setAppointment({});
        console.log("Some Error Occured while Fetching Appointments", error);
      }
    };
    fetchAppointment();
  }, []);

  const handlerUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointment((prevAppointments) =>
        prevAppointments.map((appointments) =>
          appointments._id === appointmentId
            ? {...appointments, status }
            : appointments
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello ,</p>
              <h5>{user && `${user.firstname} ${user.lastname}`}</h5>
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
              quis odit eveniet nam, explicabo adipisci.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p> Total Appointments</p>
          <h3>1500</h3>
        </div>
        <div className="thirdBox">
          <p> Register Doctors</p>
          <h3>20</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointment && appointment.length > 0 ? (
              appointment.map((appointments) => {
                return (
                  <tr key={appointments._id}>
                    <td>
                      {`${appointments.firstname} ${appointments.lastname}`}{" "}
                    </td>
                    <td>{appointments.appointment_date.substring(0, 16)} </td>
                    <td>
                      {`${appointments.doctor.firstname} ${appointments.doctor.lastname}`}
                    </td>
                    <td>{appointments.department} </td>
                    <td>
                      <select
                        className={
                          appointments.status === "Pending"
                            ? "value-pending"
                            : appointments.status === "Rejected"
                            ? "value-rejected"
                            : "value-accepted"
                        }
                        value={appointments.status}
                        onChange={(e) =>
                          handlerUpdateStatus(appointments._id, e.target.value)
                        }
                      >
                        {" "}
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointments.hasVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}{" "}
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1>NO APPOINTMENT</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dasdboard;
