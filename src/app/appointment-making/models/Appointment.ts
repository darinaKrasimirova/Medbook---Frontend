import { Doctor } from "../../shared/models/Doctor"
import { Workplace } from "../../shared/models/Workplace"
import { User } from "../../shared/models/User"

export interface Appointment{
    id?: number
    doctor: Doctor
    workplace: Workplace
    patient: User
    date: string
    time: string
}