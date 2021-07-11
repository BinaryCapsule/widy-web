import * as yup from 'yup';
import { ScopeOption } from '../../api/useScopesQuery';

export interface FormValues {
  summary: string;
  scope: ScopeOption;
}

export const validationSchema = yup.object().shape({
  summary: yup.string().required('Task summary is a required'),
});
