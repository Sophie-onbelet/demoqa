import { ElementHandle, Locator, Page, expect } from "@playwright/test";
import { User } from "../Models/User";
import { Address } from "../Models/Address";

export enum Hobby {
    Sports = 'input[id="hobbies-checkbox-1"]',
    Reading = 'input[id="hobbies-checkbox-2"]',
    Music = 'input[id="hobbies-checkbox-3"]'
}

export class FormPage {
    //properties
    page: Page;
    fname: Locator;
    lname: Locator;
    email: Locator;
    gender: string;
    mobile: Locator;
    dateofbirth: Locator;
    monthselector: Locator;
    yearselector: Locator;
    days: ElementHandle[];
    months: ElementHandle[];
    years: ElementHandle[];
    subjects: Locator;
    currentaddress: Locator;
    state: Locator;
    city: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fname = page.locator('input[id="firstName"]');
        this.lname = page.locator('input[id="lastName"]');
        this.email = page.locator('input[id="userEmail"]');
        this.gender = 'input[name="gender"][value="replaceMe"]';
        this.mobile = page.locator('input[id="userNumber"]');
        this.dateofbirth = page.locator('input[id="dateOfBirthInput"]');
        this.subjects = page.locator('div[class="subjects-auto-complete__input"]');
        this.currentaddress = page.locator('textarea[id="currentAddress"]');
        this.state = page.locator('div[id="state"] input');
        this.city = page.locator('input[id="userEmail"]');
    }

    async goToFormPage() {
        await this.page.goto("https://demoqa.com/automation-practice-form");
    }

    async fillForm(user: User) {
        await this.fname.fill(user.name);
        await this.lname.fill(user.lastName);
        await this.email.fill(user.email);
        await this.selectGender(user.gender);
        await this.mobile.fill(user.mobile);
        await this.currentaddress.fill(user.address.currentAddress);
    }

    async selectGender(gender: string) {
        const selector = this.gender.replace('replaceMe', gender);
        await this.page.locator(selector).setChecked(true, { force: true });
    }

    public async fillBirthDay(birthday: string) {
      console.log(birthday)
      await this.dateofbirth.fill(birthday);
      await this.page.locator('label[id="dateOfBirth-label"]').click();
      
    }

    async fillSubjects (subjects: string) {
      const subjectArray = subjects.split(","); // Split subjects input by comma to create an array
  for (const subject of subjectArray) {
      await this.subjects.click();
      await this.page.keyboard.type(subject);
      const subjectsDropdown = this.page.locator('div[id="react-select-2-option-0"]')
      await subjectsDropdown.click();
  }
    }

    async selectHobbies(hobbies: Hobby[]) {
      for (const hobby of hobbies) {
          await this.page.locator(hobby).check({ force: true });
      }
  }

  async selectStateAndCity(state: string, city: string) {
    await this.page.locator('div[id="state"]').click();
    await this.page.locator(`text="${state}"`).click();
    await this.page.locator('div[id="city"]').click();
    await this.page.locator(`text="${city}"`).click();
  }

  async submitButton() {
    await this.page.locator('button[id="submit"]').click();
  }
    }
    


