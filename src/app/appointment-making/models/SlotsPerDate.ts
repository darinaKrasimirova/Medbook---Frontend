export interface SlotsPerDate{
    date: string
    slots: {
        time: string,
        taken: boolean
    }[]
}