import * as yup from 'yup';

export interface FormValues {
  name: string;
  shortCode: string;
}

export const validationSchema = yup.object().shape({
  name: yup.string().required('Scope name is a required'),
  shortCode: yup.string().required('Scope code is a required'),
});
