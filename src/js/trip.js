export class Trip {
  constructor (tripType, tripPeople, food, gear, navigation, shelter, skills, personalSupplies) {
    this.tripType = tripType;
    this.tripPeople = tripPeople;
    this.food = food;
    this.gear = gear;
    this.navigation = navigation;
    this.shelter = shelter;
    this.skills = skills;
    this.personalSupplies = personalSupplies;
  }
}

export class Food {
  constructor () {
    this.day1 = {};
    this.day2 = {};
    this.day3 = {};
  }
}