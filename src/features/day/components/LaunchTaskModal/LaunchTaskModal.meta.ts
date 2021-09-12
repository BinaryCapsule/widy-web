import * as yup from 'yup';

export interface FormValues {
  sectionId: number | null;
}

export const validationSchema = yup.object().shape({
  sectionId: yup.number().nullable().required('Please select a section'),
});
