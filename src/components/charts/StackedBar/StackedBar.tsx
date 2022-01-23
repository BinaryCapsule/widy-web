import React, { useMemo, useState } from 'react';
import { Box, darkTheme, Flex, styled, Text, Tooltip } from '@binarycapsule/ui-capsules';

interface TooltipContentProps {
  label: string;
  value: string;
  color: string;
}

const TooltipText = styled(Text, {
  color: '$neutral100',

  [`.${darkTheme} &`]: {
    color: '$neutral700',
  },
});

const TooltipContent: React.FC<TooltipContentProps> = ({ label, value, color }) => {
  return (
    <Flex align="center">
      <Box css={{ width: 8, height: 9, bg: color, mr: '$1' }} />

      <TooltipText css={{ fontSize: '$1', mr: '$1' }}>{`${label}:`}</TooltipText>

      <TooltipText css={{ fontSize: '$1', fontWeight: 600 }}>{value}</TooltipText>
    </Flex>
  );
};

export interface StackedBarProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  formatter?(val: number): string;
}

export const StackedBar: React.FC<StackedBarProps> = ({ data, formatter }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = useMemo(() => {
    return data.reduce((acc, { value }) => acc + value, 0);
  }, [data]);

  return (
    <Flex
      direction="row"
      css={{ height: 24, width: '100%', overflow: 'hidden', borderRadius: '$medium' }}
    >
      {data.map(({ label, value, color }, index) => {
        return (
          <Tooltip
            key={label}
            label={
              <TooltipContent
                label={label}
                value={formatter ? formatter(value) : value.toString()}
                color={color}
              />
            }
          >
            <Flex
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              css={{
                bg: color,
                flex: value / total,
                height: 32,
                opacity: hovered !== null && hovered !== index ? 0.3 : 1,
                ml: index !== 0 ? 1 : 0,
              }}
            />
          </Tooltip>
        );
      })}
    </Flex>
  );
};
