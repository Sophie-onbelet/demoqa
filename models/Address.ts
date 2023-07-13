import { faker } from '@faker-js/faker';

export class Address {
  currentAddress: string;

  constructor() {
    this.currentAddress = faker.location.streetAddress({ useFullAddress: true });
  }
}
