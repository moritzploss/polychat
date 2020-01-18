import ISO6391 from 'iso-639-1';

const supported = [
  'en',
  'es',
  'de',
  'fr',
  'sv',
  'ro',
  'it',
  'ru',
  'fi',
  'pt',
  'nl',
  'no',
  'da',
  'bg',
  'cs',
  'eo',
  'el',
  'ga',
  'tr',
];

const supportedLanguages = supported
  .map((code: string) => ({ code, name: ISO6391.getName(code) }))
  .sort((a, b) => (a.name > b.name ? 1 : -1));

export { supportedLanguages };
