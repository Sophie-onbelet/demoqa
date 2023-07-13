import { test, expect } from '@playwright/test';
import { FormPage, Hobby } from '../pages/FormPage';
import { User } from '../Models/User';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch'; // required 'fetch' -> adblocker

test.beforeEach(async ({ page }) => {
  PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
    blocker.enableBlockingInPage(page);
  });
  await page.goto('https://demoqa.com/automation-practice-form');
});

test('Fill in the form', async ({ page }) => {
  const hobbies: Hobby[] = [Hobby.Sports, Hobby.Music];
  const subjects = 'English,Maths'; // no space between the subjects, otherwise it will be added to the word after splitting it
  const user = new User();
  const state = 'Haryana';
  const city = 'Karnal';

  const formPage = new FormPage(page);
  await formPage.goToFormPage();
  await formPage.fillForm(user);
  await formPage.fillBirthDay(user.dateOfBirth);
  await formPage.fillSubjects(subjects);
  await formPage.selectHobbies(hobbies);
  await formPage.selectStateAndCity(state, city);
  await formPage.submitButton();
});
