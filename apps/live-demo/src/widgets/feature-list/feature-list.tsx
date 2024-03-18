import { ReactNode } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react';

interface FeatureListProps {
  features: ReactNode[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <List>
      {features.map((feature, index) => (
        <ListItem key={index}>
          <ListIcon as={CheckIcon} color='purple.500' key={index} />
          {feature}
        </ListItem>
      ))}
    </List>
  );
}
