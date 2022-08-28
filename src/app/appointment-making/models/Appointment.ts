import { Doctor } from "./Doctor"
import { Workplace } from "./Workplace"
import { User } from "../../shared/models/User"

export interface Appointment{
    id?: number
    doctor: Doctor
    workplace: Workplace
    patient: User
    date: string
    time: string
}