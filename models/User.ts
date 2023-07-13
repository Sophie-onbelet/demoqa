import { faker } from '@faker-js/faker';
import { Address } from './Address';

export class User {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  dateOfBirth: string;
  hobbies: string;
  address: Address;

  constructor() {
    this.name = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
    this.mobile = faker.string.numeric({ length: 10, allowLeadingZeros: false });
    this.hobbies = faker.helpers.arrayElement(['Sports', 'Reading', 'Music']);
    this.dateOfBirth = this.setDateOfBirth();
    this.address = new Address();
  }

  private setDateOfBirth() {
    const day = faker.date.birthdate({ min: 16, max: 45, mode: 'age' }).getDay().toString();
    const month = faker.date.birthdate({ min: 16, max: 45, mode: 'age' }).getDate().toString();
    const year = faker.date.birthdate({ min: 16, max: 45, mode: 'age' }).getFullYear().toString();
    const dateOfBirth = `${month}-${day}-${year}`;
    return dateOfBirth;
  }
}
