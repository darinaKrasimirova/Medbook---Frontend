import { Doctor } from "src/app/shared/models/Doctor"
import { City } from "src/app/shared/models/City"
import { Workschedule } from "./Workshedule"

export interface Workplace{
    id?: number
    doctor: Doctor
    city: City
    address: string
    name: string
    workschedule: Workschedule[]

}