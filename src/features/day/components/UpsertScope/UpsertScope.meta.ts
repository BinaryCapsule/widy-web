import * as yup from 'yup';

export interface FormValues {
  name: string;
  shortCode: string;
}

export const validationSchema = yup.object().shape({
  name: yup.string().required('Scope name is required'),
  shortCode: yup.string().required('Scope code is required'),
});
