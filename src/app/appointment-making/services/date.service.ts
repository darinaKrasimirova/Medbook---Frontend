import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DateService{

    getRange(length: number, offset: number, startDate?: Date): Date[]{
        let dateRange: Date[] = [];
        if(!startDate)
        startDate = new Date();
        let date = startDate.getDate();
        let month = startDate.getMonth();
        let year = startDate.getFullYear();
        for (let i = 0; i < length; i++) {
            dateRange[i] = new Date(year, month, date + (i + offset));
        }
        return dateRange;
    }

    toDateString(date: Date){
        let month = (date.getMonth() + 1).toString();
        if(month.length == 1){
          month = 0 + month;
        }
        let day = date.getDate().toString();
        if(day.length == 1){
          day = 0 + day;
        }
        return date.getFullYear() + "-" + month + "-" +  day;
    }
}