export interface User{
    id?: number
    name?: string
    accountType: "PATIENT"|"DOCTOR"
    accountStatus?: "CREATED"|"ACTIVE"|"ARCHIVED"
    email: string
    username: string
    password: string
    phoneNumber?: string
}