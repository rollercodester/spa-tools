import { useRef } from 'react';
import { Heading, Input, Text, VStack, Wrap } from '@chakra-ui/react';
import { useIsHovered } from '@spa-tools/interaction-hooks';
import { DemoButton, DemoCodeHeading, DemoViewport } from 'showcase/widgets';

export function UseIsHoveredTabPanel() {
  return (
    <DemoViewport
      code={CODE}
      demoWidget={<DemoWidget />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Have you ever had UX requirements to trigger multiple interactions when a user hovers their mouse over an
            element or array of elements?
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            As much as we strive to use pure CSS for native UI state detection, sometimes we find ourselves in
            situations where querying the DOM for state is not practical and instead need to fallback on DOM events.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            In that vain, if you find yourself dealing with complex hover interactions, this hook may make your life
            eaiser.
          </Text>
        </VStack>
      }
      inputWidget={<DemoCodeHeading codeText='useIsHovered' />}
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const buttonClusterRef1 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef2 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef3 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef4 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef5 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef6 = useRef<HTMLButtonElement>(null);

  const isButtonHovered = useIsHovered(buttonRef);
  const isInputHovered = useIsHovered(inputRef);
  const isSpanHovered = useIsHovered(spanRef);
  const isButtonClusterHovered = useIsHovered([
    buttonClusterRef1,
    buttonClusterRef2,
    buttonClusterRef3,
    buttonClusterRef4,
    buttonClusterRef5,
    buttonClusterRef6,
  ]);

  const getHoverStateText = () => {
    if (isButtonHovered) {
      return 'Very first button is hovered!';
    }
    if (isInputHovered) {
      return 'Input is hovered!';
    }
    if (isSpanHovered) {
      return 'Text is hovered!';
    }
    if (isButtonClusterHovered) {
      return 'One of the six buttons from cluster is hovered!';
    }

    return 'Nothing is hovered!';
  };

  return (
    <VStack sx={{ alignItems: 'flex-start', gap: '1rem', p: '1.5rem' }}>
      <Wrap align='center' spacing='1rem'>
        <DemoButton onClick={() => undefined} ref={buttonRef} text='Hover me!' />
        <Input defaultValue='No, hover over me!' ref={inputRef} sx={{ color: 'whiteAlpha.800', w: '20rem' }} />
        <Text as='div' sx={{ color: 'whiteAlpha.800' }}>
          Don&apos;t listen to them, hover over{' '}
          <Text as='span' ref={spanRef} sx={{ color: 'purple.300', cursor: 'pointer', fontWeight: 800 }}>
            this text
          </Text>{' '}
          instead!
        </Text>
      </Wrap>
      <Wrap align='center' spacing='1rem'>
        <DemoButton onClick={() => undefined} ref={buttonClusterRef1} text='Hover' />
        <DemoButton onClick={() => undefined} ref={buttonClusterRef2} text='Over' />
        <DemoButton onClick={() => undefined} ref={buttonClusterRef3} text='Any' />
        <DemoButton onClick={() => undefined} ref={buttonClusterRef4} text='One' />
        <DemoButton onClick={() => undefined} ref={buttonClusterRef5} text='Of' />
        <DemoButton onClick={() => undefined} ref={buttonClusterRef6} text='Us' />
      </Wrap>
      <Heading sx={{ color: 'whiteAlpha.800' }}>{getHoverStateText()}</Heading>
    </VStack>
  );
}

//
//
// DISPLAY CODE
//
//

const CODE = `import { useRef } from 'react';
import { useIsHovered } from '@spa-tools/interaction-hooks';

function UseIsHoveredDemo() {
  // here we simply setup refs to all elements we want
  // to track hover state for
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  // yes, you can also track hover state for multiple elements at once!
  const buttonClusterRef1 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef2 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef3 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef4 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef5 = useRef<HTMLButtonElement>(null);
  const buttonClusterRef6 = useRef<HTMLButtonElement>(null);

  // then we use different hook instances to track the
  // hover state for the above element refs
  const isButtonHovered = useIsHovered(buttonRef);
  const isInputHovered = useIsHovered(inputRef);
  const isSpanHovered = useIsHovered(spanRef);
  const isButtonClusterHovered = useIsHovered([
    buttonClusterRef1,
    buttonClusterRef2,
    buttonClusterRef3,
    buttonClusterRef4,
    buttonClusterRef5,
    buttonClusterRef6,
  ]);

  const getHoverStateText = () => {
    if (isButtonHovered) {
      return 'Very first button is hovered!';
    }
    if (isInputHovered) {
      return 'Input is hovered!';
    }
    if (isSpanHovered) {
      return 'Text is hovered!';
    }
    if (isButtonClusterHovered) {
      return 'One of the six buttons from cluster is hovered!';
    }

    return 'Nothing is hovered!';
  };

  return (
    <div>
      <div>
        <button ref={buttonRef}>Hover me!</button>
        <input ref={inputRef} value='No, hover over me!' />
        <div>
          Don&apos;t listen to them, hover over{' '}
          <span ref={spanRef} style={{ color: 'purple', cursor: 'pointer', fontWeight: 800 }}>
            this text
          </span>{' '}
          instead!
        </div>
      </div>
      <div>
        <button ref={buttonClusterRef1}/>Hover</button>
        <button ref={buttonClusterRef2}/>Over</button>
        <button ref={buttonClusterRef3}/>Any</button>
        <button ref={buttonClusterRef4}/>One</button>
        <button ref={buttonClusterRef5}/>Of</button>
        <button ref={buttonClusterRef6}/>Us</button>
      </div>
      <h2>{getHoverStateText()}</h2>
    </div>
  );
}`;
