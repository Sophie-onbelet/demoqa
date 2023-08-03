import { faker } from '@faker-js/faker';

export class Address {
  currentAddress: string;
  state: string;
  city: string;

  constructor() {
    this.currentAddress = faker.location.streetAddress({ useFullAddress: true });
    this.fillStateAndCity();
  }

  fillStateAndCity() {
    const statePicker = faker.helpers.arrayElement(['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan']);
    let cityPicker = '';
    switch (statePicker) {
      case 'NCR':
        cityPicker = faker.helpers.arrayElement(['Delhi', 'Gurgaon', 'Noida']);
        break;
      case 'Uttar Pradesh':
        cityPicker = faker.helpers.arrayElement(['Agra', 'Lucknow', 'Merrut']);
        break;
      case 'Haryana':
        cityPicker = faker.helpers.arrayElement(['Karnal', 'Panipat']);
        break;
      case 'Rajasthan':
        cityPicker = faker.helpers.arrayElement(['Jaipur', 'Jaiselmer']);
        break;
      default:
        break;
    }
    this.city = cityPicker;
    this.state = statePicker;
  }
}
