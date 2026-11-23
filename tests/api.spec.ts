import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

test('GET a post returns 200 and the right fields', async ({ request }) => {
  const res = await request.get(`${API}/posts/1`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toMatchObject({ id: 1, userId: 1 });
  expect(typeof body.title).toBe('string');
});

test('POST creates a post and returns 201', async ({ request }) => {
  const res = await request.post(`${API}/posts`, {
    data: { title: 'QA test', body: 'Hello', userId: 1 },
  });
  expect(res.status()).toBe(201);
  expect(await res.json()).toMatchObject({ title: 'QA test' });
});

test('GET a missing post returns 404', async ({ request }) => {
  const res = await request.get(`${API}/posts/99999`);
  expect(res.status()).toBe(404);
});