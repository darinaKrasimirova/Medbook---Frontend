import { City } from "src/app/shared/models/City"

export interface Workplace{
    id?: number
    city: City
    address: string
}