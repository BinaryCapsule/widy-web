import * as yup from 'yup';

export interface FormValues {
  hours: number;
  minutes: number;
}

export const validationSchema = yup.object().shape({
  hours: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0)
    .max(24),
  minutes: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0)
    .max(1440),
});

export const suggestions = [
  { label: '30 min', hours: 0, minutes: 30 },
  { label: '1 hour', hours: 1, minutes: 0 },
  { label: '2 hours', hours: 2, minutes: 0 },
  { label: '3 hours', hours: 3, minutes: 0 },
  { label: '4 hours', hours: 4, minutes: 0 },
];
