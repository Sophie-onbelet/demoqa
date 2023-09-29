import { test, expect } from '@playwright/test';
import reqresUser from '../jsons/reqres/user.json';
import reqresResource from '../jsons/reqres/resources.json';
import { User, Color, CreateUser } from '/models/formpage/api/Interfaces.ts';

test.describe("Sophie's tests over reqres endpoints @Sophie @API", () => {
  test('Get user from endpoint @Positive', async ({ request }) => {
    const response = await request.get(`${process.env.REQRES_API}/users/2`);
    expect(response.ok()).toBeTruthy();

    const parsedResponse = await response.json();
    const myUserData: User = parsedResponse['data'];
    expect(myUserData).toEqual(reqresUser);
  });

  test('Get data from "unknown" endpoint @Positive', async ({ request }) => {
    const response = await request.get(`${process.env.REQRES_API}/unknown/2`);
    expect(response.ok()).toBeTruthy();

    const parsedResponse = await response.json();
    const myUserData: Color = parsedResponse['data'];
    expect(myUserData).toEqual(reqresResource[0]);

    const responseList = await request.get(`${process.env.REQRES_API}/unknown`);
    expect(responseList.ok()).toBeTruthy();

    const JsonResponse = await responseList.json();
    const count = ([] = JsonResponse['data']);
    expect(count.length).toBe(6);

    const oneUser: Color = JsonResponse['data'][4];
    expect(oneUser).toEqual(reqresResource[1]);
  });

  test('Create a new user @Positive', async ({ request }) => {
    const user = {
      name: 'Sophie',
      job: 'Queen',
    };
    const response = await request.post(`${process.env.REQRES_API}/users`, { data: user });
    expect(response.ok()).toBeTruthy();

    const parsedResponse = await response.json();
    const myUser: CreateUser = parsedResponse;
    expect.soft(myUser.name).toEqual(user.name);
    expect.soft(myUser.job).toEqual(user.job);
    expect.soft(myUser.id).toBeDefined();
    expect.soft(myUser.createdAt).toBeDefined();
  });
});
