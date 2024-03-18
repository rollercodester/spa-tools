import { Tab, Text } from '@chakra-ui/react';

interface TabTitleProps {
  code?: boolean;
  icon: JSX.Element;
  text: string;
}

export function TabTitle({ code, icon, text }: TabTitleProps) {
  return (
    <Tab sx={{ alignSelf: 'flex-start', height: '4rem' }}>
      {icon}
      <Text as='div' sx={{ ml: '0.5rem' }}>
        {code ? <pre>{text}</pre> : text}
      </Text>
    </Tab>
  );
}
