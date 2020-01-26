import { User } from '../schemas/user';

const testUserData = [
  {
    name: 'Moritz',
    language: 'en',
    email: 'moritz@english.com',
  },
  {
    name: 'Axel',
    language: 'sv',
    email: 'moritz@swedish.com',
  },
  {
    name: 'Ariadna',
    language: 'es',
    email: 'moritz@spanish.com',
  },
  {
    name: 'Mario',
    language: 'it',
    email: 'moritz@italian.com',
  },
  {
    name: 'Amelie',
    language: 'fr',
    email: 'moritz@french.com',
  },
  {
    name: 'Lisa',
    language: 'de',
    email: 'moritz@german.com',
  },
];

const testUsers = testUserData.map((user) => (
  new User({
    email: user.email,
    password: process.env.TEST_USER_PASSWORD,
    name: user.name,
    language: user.language,
    contacts: [],
    messages: {
      test: [],
    },
  })
));

export { testUsers };
