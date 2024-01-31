import React, { ComponentPropsWithoutRef } from 'react';
import { Box } from '@binarycapsule/ui-capsules';

export const PlanCheckBox: React.FC<Pick<ComponentPropsWithoutRef<'div'>, 'style'>> = ({
  style,
}) => {
  const color = '#9fa5b2';

  return (
    <Box style={{ width: 20, height: 20, ...style }}>
      <svg
        viewBox="0 0 20 20"
        width={20}
        height={20}
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path
          d="M18.231 4H20V3c0-1.655-1.345-3-3-3h-1v1.769h1c.679 0 1.231.552 1.231 1.23v1zM1.769 4H0V3c0-1.655 1.344-3 3-3h1v1.769H3c-.679 0-1.231.552-1.231 1.23v1zM18.231 16H20v1c0 1.655-1.345 3-3 3h-1v-1.77h1c.679 0 1.231-.551 1.231-1.23v-1zM1.769 16H0v1c0 1.655 1.344 3 3 3h1v-1.77H3c-.679 0-1.231-.551-1.231-1.23v-1z"
          fill={color}
          fillRule="nonzero"
        />
        <path
          fill={color}
          d="M8 0h4v1.769H8zM8 18.23h4V20H8zM18.232 7.999v4h1.769v-4zM0 8v4h1.769V8z"
        />
      </svg>
    </Box>
  );
};
