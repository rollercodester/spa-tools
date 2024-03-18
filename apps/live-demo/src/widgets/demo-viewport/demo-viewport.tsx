import { ReactNode, useEffect, useState } from 'react';
import { Box, Button, Code, HStack, Heading, Tab, TabList, Tabs, VStack, useMediaQuery } from '@chakra-ui/react';
import { Console, Hook, Unhook } from 'console-feed';
import { Highlight, HighlightProps, themes } from 'prism-react-renderer';
import type { Message } from 'console-feed/lib/definitions/Component';

interface DemoViewportProps extends Pick<HighlightProps, 'code' | 'language'> {
  codeOnly?: boolean;
  ctaContent?: ReactNode;
  ctaIcon?: JSX.Element;
  ctaIsLoading?: boolean;
  demoWidget?: JSX.Element;
  headingContent: ReactNode;
  initialOutputMessage?: string;
  inputWidget?: JSX.Element;
  onClickCtaButton?: () => void;
}

export function DemoViewport({
  code,
  codeOnly,
  ctaContent,
  ctaIcon,
  ctaIsLoading,
  demoWidget,
  headingContent,
  initialOutputMessage = '',
  inputWidget,
  language,
  onClickCtaButton,
}: DemoViewportProps) {
  const [isSmallScreen] = useMediaQuery('(max-width: 530px)');
  const [viewportTabIndex, setViewportTabIndex] = useState(0);
  const [messages, setMessages] = useState<unknown[]>([
    { data: ['\n\n\n\n'], id: 'head', method: 'log' },
    { data: [initialOutputMessage], id: 'initial', method: 'log' },
    { data: ['\n\n\n\n'], id: 'foot', method: 'log' },
  ]);

  const handleViewportTabChange = (index: number) => {
    setViewportTabIndex(index);
  };

  useEffect(() => {
    const hookedConsole = Hook(window.console, (msg) => setMessages((currLogs) => [...currLogs, msg]), false);
    return () => {
      Unhook(hookedConsole);
    };
  }, []);

  return (
    <VStack sx={{ alignItems: 'flex-start', gap: '2rem', width: '100%' }}>
      <Heading size='sm' sx={{ px: '1.5rem' }}>
        {headingContent}
      </Heading>
      <VStack
        sx={{
          alignItems: 'flex-start',
          border: '1px solid',
          borderColor: 'gray.400',
          position: 'relative',
          width: '100%',
        }}
      >
        <HStack sx={{ alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
          {onClickCtaButton && (
            <Button
              colorScheme='purple'
              isLoading={ctaIsLoading}
              leftIcon={ctaIcon}
              onClick={() => {
                setMessages([]);
                setViewportTabIndex(codeOnly ? 0 : 1);
                onClickCtaButton();
              }}
              sx={{
                justifyContent: 'flex-start',
                mb: '1rem',
                ml: '1.5rem',
                mt: '1.5rem',
                py: '1.5rem',
                textAlign: 'left',
              }}
            >
              {ctaContent}
            </Button>
          )}
          {!onClickCtaButton && <Box sx={{ mb: '1.5rem', mt: '1.5rem' }} />}
          {!!inputWidget && <Box sx={{ alignSelf: 'center', flex: 1, ml: '0.25rem', mt: '0.6rem' }}>{inputWidget}</Box>}
          {!isSmallScreen && (
            <Tabs index={viewportTabIndex} onChange={handleViewportTabChange} size='sm' variant='unstyled'>
              <TabList
                sx={{
                  borderBottom: '1px solid',
                  borderBottomColor: 'gray.400',
                  borderLeft: '1px solid',
                  borderLeftColor: 'gray.400',
                }}
              >
                <Tab
                  _selected={{ bg: 'gray.200' }}
                  sx={{
                    borderRight: codeOnly ? 'none' : '1px solid',
                    borderRightColor: 'gray.400',
                    py: '0.25rem',
                    w: '5rem',
                  }}
                >
                  {demoWidget ? 'Demo' : 'Code'}
                </Tab>
                {!codeOnly && (
                  <Tab _selected={{ bg: 'gray.200' }} sx={{ py: '0.25rem', w: '5rem' }}>
                    {demoWidget ? 'Code' : 'Output'}
                  </Tab>
                )}
              </TabList>
            </Tabs>
          )}
        </HStack>
        {(viewportTabIndex === 0 || isSmallScreen) && !!demoWidget && (
          <Box
            sx={{
              bg: '#242424',
              width: '100%',
            }}
          >
            {demoWidget}
          </Box>
        )}
        {(((viewportTabIndex === 0 || isSmallScreen) && !demoWidget) ||
          ((viewportTabIndex === 1 || isSmallScreen) && !!demoWidget)) && (
          <Highlight code={code} language={language} theme={themes.shadesOfPurple}>
            {({ className, getLineProps, getTokenProps, style, tokens }) => (
              <Code
                as='pre'
                className={className}
                style={style}
                sx={{
                  '& .token-line': { height: '1.3rem', lineHeight: '1.3rem' },
                  overflow: 'auto',
                  px: '0.5rem',
                  py: '1rem',
                  textAlign: 'left',
                  textWrap: 'wrap',
                  width: '100%',
                }}
              >
                {tokens.map((line, i) => (
                  <Box key={i} {...getLineProps({ key: i, line })} sx={{ display: 'table-row' }}>
                    <Box
                      as='span'
                      sx={{
                        display: 'table-cell',
                        opacity: '0.5',
                        pr: '1rem',
                        textAlign: 'right',
                        userSelect: 'none',
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Box sx={{ display: 'table-cell' }}>
                      {line.map((token, key) => (
                        <Box as='span' key={key} {...getTokenProps({ key, token })} />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Code>
            )}
          </Highlight>
        )}
        {(viewportTabIndex === 1 || isSmallScreen) && !demoWidget && (
          <Box
            sx={{
              bg: '#242424',
              width: '100%',
            }}
          >
            <Console
              logs={messages as Message[]}
              styles={{
                BASE_COLOR: '#FFFFFF',
                BASE_FONT_SIZE: 'small',
                LOG_COLOR: '#FFFFFF',
                LOG_ERROR_ICON: ' ',
                OBJECT_VALUE_STRING_COLOR: '#9C96E3',
              }}
              variant='dark'
            />
          </Box>
        )}
      </VStack>
    </VStack>
  );
}

export function logCode(code: string, result = '') {
  console.log(
    `%c${code}%c${result ? ' results in ' : ''}%c${result}`,
    'color: #5092d9; font-size: small; font-weight: 600; padding: 0.25rem 0',
    'color: #aaaaaa; font-size: small; font-weight: 600; padding: 0.25rem 0',
    'color: #cc7013; font-size: small; font-weight: 600; padding: 0.25rem 0'
  );
}

export function logComment(comment: string | string[]) {
  const normComment = Array.isArray(comment) ? comment : [comment];
  normComment.forEach((c) => console.log(`%c// ${c}`, 'color: #4e942c; font-size: small; font-weight: 600;'));
}

export function logLabel(label: string) {
  console.log(`%c${label}`, 'color: #AC83C9; font-size: small; font-weight: 800;');
}

export function logTip(tip: string) {
  const asterisks = '*'.repeat(tip.split('\n').reduce((maxLine, line) => Math.max(maxLine, line.length), 0) + 4);
  console.log(`%c\n${asterisks}\n  ${tip}\n${asterisks}`, 'color: cyan; font-size: small; font-weight: bold;');
}
