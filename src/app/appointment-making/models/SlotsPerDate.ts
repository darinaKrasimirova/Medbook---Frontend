export interface SlotsPerDate{
    date: Date
    slots: {
        time: Date,
        disabled: boolean
    }[]
}