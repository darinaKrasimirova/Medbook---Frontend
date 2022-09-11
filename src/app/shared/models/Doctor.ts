import { MedicalField } from "./MedicalField"
import { Workplace } from "./Workplace"

export interface Doctor{
    id?: number
    userId?: number
    name: string
    phoneNumber?:string
    personalDescription?: string
    educationDescription?: string
    practiceStart: Date
    practiceDescription?: string
    medicalField: MedicalField
    image?: string
    servicesDescription?: string
    workplaces?: Workplace[]
}