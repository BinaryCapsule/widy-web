import { useActiveTaskQuery } from '../day/api/useActiveTaskQuery';

export const useRibbon = () => {
  const queryResult = useActiveTaskQuery();

  return {
    ...queryResult,
    isActive: queryResult.isSuccess && !!queryResult.data.id,
  };
};
