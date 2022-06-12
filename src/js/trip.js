import dateDiff from '../index.js';

export class Trip {
  constructor (tripType, tripName, tripPeople, tripDestination, tripDates, food, gear, navigation, shelter, skills, personalSupplies) {
    this.tripType = tripType;
    this.tripName = tripName;
    this.tripPeople = tripPeople;
    this.tripDestination = tripDestination;
    this.tripDates = tripDates;
    this.food = food ? food : {};
    this.gear = gear;
    this.navigation = navigation;
    this.shelter = shelter;
    this.skills = skills;
    this.personalSupplies = personalSupplies;
  }
}

export class FoodSchedule {
  constructor (foodDay1) {
    this.foodDay1 = foodDay1;
  }
}

export class TripDates {
  constructor(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfDays;
    this.numberOfNights;
    this.datesListed = [];
  }

  calcDateDiff() {
    const date1 = new Date(this.startDate);
    const date2 = new Date(this.endDate);
    const diffBetweenDates = dateDiff(date1, date2);
    this.numberOfDays = diffBetweenDates + 1;
    this.numberOfNights = diffBetweenDates;
  }

  populateDatesListed() {
    const date1 = new Date(this.startDate);
    this.datesListed = []; 
    // I'm not sure why but I need to start i = 1 for this function's loop to populate the dates correctly. Even though it seems i=0 should work..
    for(let i = 1; i < this.numberOfDays + 1; i++) {
      let nextDate = new Date();
      let dateStr;
      nextDate.setDate(date1.getDate() + i);
      dateStr = nextDate.toDateString();
      this.datesListed.push(dateStr);
    }
  }
}