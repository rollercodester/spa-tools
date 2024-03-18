import { useEffect, useRef } from 'react';
import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useDetectKeyDown } from '@spa-tools/interaction-hooks';
import { DemoButton, DemoCodeHeading, DemoViewport } from 'showcase/widgets';

export function UseDetectKeydownTabPanel() {
  return (
    <DemoViewport
      code={CODE}
      demoWidget={<DemoWidget />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Using complicated form validation libraries for common input interactions can be like taking a sledgehammer
            to a thumbtack.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            Stop writing keyboard event handlers out of defiance. Instead, practice your rebellion using a
            sweetly-simple hook.
          </Text>
        </VStack>
      }
      inputWidget={<DemoCodeHeading codeText='useDetectKeydown' />}
      language='tsx'
    />
  );
}

//
//
// helpers
//
//

function DemoWidget() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [onKeyDownInput1, onKeyDownInput1KeysDetected] = useDetectKeyDown('P', ['Shift', 'Control']);
  const [onKeyDownInput2] = useDetectKeyDown('Enter', submitButtonRef);

  useEffect(() => {
    if (onKeyDownInput1KeysDetected) {
      alert('Shift-Ctrl-P detected!');
    }
  }, [onKeyDownInput1KeysDetected]);

  return (
    <VStack sx={{ alignItems: 'flex-start', gap: '1rem', p: '1.5rem' }}>
      <HStack>
        <Input
          focusBorderColor='purple.500'
          onKeyDown={onKeyDownInput1}
          placeholder='Focus here and press Shift-Ctrl-P'
          sx={{ color: 'whiteAlpha.800', w: '20rem' }}
        />
      </HStack>
      <HStack>
        <Input
          focusBorderColor='purple.500'
          onKeyDown={onKeyDownInput2}
          placeholder='Type something here and press Enter'
          sx={{ color: 'whiteAlpha.800', w: '20rem' }}
        />
        <DemoButton
          onClick={() => {
            alert('Submit button clicked!');
          }}
          ref={submitButtonRef}
          text='Submit'
        />
      </HStack>
    </VStack>
  );
}

//
//
// DISPLAY CODE
//
//

const CODE = `import { useEffect, useRef } from 'react';
import { useDetectKeyDown } from '@spa-tools/interaction-hooks';

function UseDetectKeyDownDemo() {
  // here we wire up a ref for the submit button that we will auto-click
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  // here we ask the hook to set onKeyDownInput1KeyDetected to true
  // when the Shift-Ctrl-P keys are pressed
  const [onKeyDownInput1, onKeyDownInput1KeysDetected] = useDetectKeyDown('P', ['Shift', 'Control']);
  // here we ask the hook to auto-click the submit button when
  // the Enter key is pressed
  const [onKeyDownInput2] = useDetectKeyDown('Enter', submitButtonRef);

  useEffect(() => {
    // we simply alert when the Shift-Ctrl-P keys are detected
    if (onKeyDownInput1KeysDetected) {
      alert('Shift-Ctrl-P detected!');
    }
  }, [onKeyDownInput1KeysDetected]);

  return (
    <div>
      <div>
        <input onKeyDown={onKeyDownInput1} placeholder='Focus here and press Shift-Ctrl-P' />
      </div>
      <div>
        <input onKeyDown={onKeyDownInput2} placeholder='Type something here and press Enter' />
        <button
          onClick={() => {
            alert('Submit button clicked!');
          }}
          ref={submitButtonRef}
        >
          Submit
        </button>
      </div>
    </div>
  );
}`;
