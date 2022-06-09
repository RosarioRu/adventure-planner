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
    this.daysListed = [];
  }

  calcDateDiff() {
    const date1 = new Date(this.startDate);
    const date2 = new Date(this.endDate);
    const daysOfTrip = dateDiff(date1, date2);
    this.numberOfDays = daysOfTrip;
  }
}