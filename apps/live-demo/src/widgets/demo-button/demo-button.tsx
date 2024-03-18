import { Ref } from 'react';
import { Button, forwardRef } from '@chakra-ui/react';

export const DemoButton = forwardRef(
  ({ onClick, text }: { onClick: () => void; text: string }, ref: Ref<HTMLButtonElement>) => {
    return (
      <Button colorScheme='whiteAlpha' onClick={onClick} ref={ref} variant='solid'>
        {text}
      </Button>
    );
  }
);
