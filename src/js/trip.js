export class Trip {
  constructor (tripType, tripName, tripPeople, tripDestination, tripStartDate, tripEndDate, food, gear, navigation, shelter, skills, personalSupplies) {
    this.tripType = tripType;
    this.tripName = tripName;
    this.tripPeople = tripPeople;
    this.tripDestination = tripDestination;
    this.tripStartDate = tripStartDate;
    this.tripEndDate = tripEndDate;
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