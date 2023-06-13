import data from '../assets/data.json';
import * as rng from './rng';

const templates = {
  regular: {
    weight: 0.9,
    middle: [2],
    end: {
      value: [3],
      template: '{value}',
    },
  },
  oldtimer: {
    weight: 0.01,
    middle: [2],
    end: {
      value: [2],
      template: '{value}H',
    },
  },
  electro: {
    weight: 0.09,
    middle: [2],
    end: {
      value: [2],
      template: '{value}E',
    },
  },
};
function generateFromTemplate(templateKey) {
  const template = templates[templateKey];
  const middleChars = rng.pick(template.middle);
  const middle = rng.alpha(middleChars);
  const endChars = rng.pick(template.end.value);
  const endValue = rng.numeric(endChars);
  const end = template.end.template.replace('{value}', endValue);
  return [middle, end];
}

const distribution = Object.entries(templates)
  .map(([key, { weight }]) => [weight, key])
  .sort((a, b) => b[0] - a[0])
  .reduce(
    (acc, [weight, key]) => [
      ...acc,
      acc.length > 0 ? [acc[acc.length - 1][0] + weight, key] : [weight, key],
    ],
    [],
  );

// eslint-disable-next-line import/prefer-default-export
export function getRandomLicensePlate() {
  const city = data[Math.floor(Math.random() * data.length)];
  const roll = Math.random();
  const [, templateKey] = distribution.find(([d]) => roll < d);
  const [middle, end] = generateFromTemplate(templateKey);
  return {
    city,
    middle,
    end,
  };
}
