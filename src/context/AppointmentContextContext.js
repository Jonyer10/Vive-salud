import { createContext, useContext } from "react";

export const AppointmentContext = createContext();
export const useAppointment = () => useContext(AppointmentContext);
