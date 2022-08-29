export interface User{
    id?: number
    name?: string
    accountType: "user"|"doctor"
    email: string
    username: string
    password: string
}