import React, { useMemo, useState } from 'react';
import { Box, Flex, Text, Tooltip } from '@binarycapsule/ui-capsules';
import { styled, useTheme } from 'styled-components';

interface TooltipContentProps {
  label: string;
  value: string;
  color: string;
}

const TooltipText = styled(Text)(({ theme }) => ({
  color: theme.colors.neutral100,

  '.darkTheme &': {
    color: theme.colors.neutral700,
  },
}));

const TooltipContent: React.FC<TooltipContentProps> = ({ label, value, color }) => {
  const theme = useTheme();
  return (
    <Flex align="center">
      <Box style={{ width: 8, height: 9, background: color, marginRight: 4 }} />

      <TooltipText style={{ fontSize: theme.fontSizes.sm, marginRight: 4 }}>
        {`${label}:`}
      </TooltipText>

      <TooltipText style={{ fontSize: theme.fontSizes.sm, fontWeight: 600 }}>{value}</TooltipText>
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
  const theme = useTheme();

  const [hovered, setHovered] = useState<number | null>(null);

  const total = useMemo(() => {
    return data.reduce((acc, { value }) => acc + value, 0);
  }, [data]);

  return (
    <Flex
      direction="row"
      style={{ height: 24, width: '100%', overflow: 'hidden', borderRadius: theme.radii.medium }}
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
              style={{
                background: color,
                flex: value / total,
                height: 32,
                opacity: hovered !== null && hovered !== index ? 0.3 : 1,
                marginLeft: index !== 0 ? 1 : 0,
              }}
            />
          </Tooltip>
        );
      })}
    </Flex>
  );
};
