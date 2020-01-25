import { MongoRegexQuery } from '../types/backend';

const toMongoRegex = ([fieldName, regex]): MongoRegexQuery => (
  ({ [fieldName]: { $regex: RegExp(regex), $options: 'i' } })
);

const queryParamsToMongoRegexQuery = (queryParams: Record<string, string>): MongoRegexQuery => (
  Object.entries(queryParams)
    .map(toMongoRegex)
    .reduce((previous, current) => ({ ...previous, ...current }), {})
);

export { queryParamsToMongoRegexQuery };
