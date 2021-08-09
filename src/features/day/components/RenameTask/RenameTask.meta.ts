import * as yup from 'yup';

export interface FormValues {
  summary: string;
}

export const validationSchema = yup.object().shape({
  summary: yup.string().required('Task summary is required'),
});
