import { Box, Code, Text, VStack } from '@chakra-ui/react';
import { hexToRgba, rgbaToHex, shade, tint, tone } from '@spa-tools/utilities';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { DemoViewport, FeatureList, logCode, logLabel, logTip } from 'showcase/widgets';

export function ColorsTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Colors Demo'
      ctaIcon={<IoColorPaletteOutline fontSize='2.25rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Sometimes even the most comprehensive UX style guides and redlines cannot give you full color coverage.
            Perhaps you need to dynmaically generate chromatic colors for data visualization, or maybe you need to
            convert an input color on the fly.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            If you ever find yourself in need, we hope these helpers add some <em>colorful</em> vibes to your dev world:
          </Text>
          <Box sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[
                <Code key='hexToRgbaAndrbgaTohex'>hexToRgba / rgbaToHex</Code>,
                <Code key='shade'>shade</Code>,
                <Code key='tint'>tint</Code>,
                <Code key='tone'>tone</Code>,
              ]}
            />
          </Box>
        </VStack>
      }
      initialOutputMessage='Click the "Run Colors Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logTip('hexToRgba / rgbaToHex');
        logLabel('These functions simply convert a hex color string to an rgba color string and vice versa:');
        logCode("rgbaToHex('rgba(80, 146, 217, 0.8)')", `'${rgbaToHex('rgba(80, 146, 217, 0.8')}'`);
        logCode("hexToRgba('#5092d9cc')", `'${hexToRgba('#5092d9cc')}'`);

        logTip('shade');
        logLabel('Modifies the shade of a color by adding "black" per given `ratio` between `0` and `1`:');
        logCode("shade('#5092d9', 0.5).toHex()", `'${shade('#5092d9', 0.5).toHex()}'`);
        logLabel('By default an exponential algo is applied but passing true will switch to linear:');
        logCode("shade('#5092d9', 0.5, true).toHex()", `'${shade('#5092d9', 0.5, true).toHex()}'`);
        logLabel('And we can return an rgba string as well, which applies to all following color functions:');
        logCode("shade('#5092d9', 0.5).toRgba()", `'${shade('#5092d9', 0.5).toRgba()}'`);

        logTip('tint');
        logLabel('Modifies the tint of a color by adding "white" per given `ratio` between `0` and `1`:');
        logCode("tint('#5092d9', 0.5).toHex()", `'${tint('#5092d9', 0.5).toHex()}'`);
        logLabel('By default an exponential algo is applied but passing true will switch to linear:');
        logCode("tint('#5092d9', 0.5, true).toHex()", `'${tint('#5092d9', 0.5, true).toHex()}'`);

        logTip('tone');
        logLabel('Modifies the tone of a color by adding "gray" per given `ratio` between `0` and `1`:');
        logCode("tone('#5092d9', 0.5).toHex()", `'${tone('#5092d9', 0.5).toHex()}'`);
        logLabel('By default an exponential algo is applied but passing true will switch to linear:');
        logCode("tone('#5092d9', 0.5, true).toHex()", `'${tone('#5092d9', 0.5, true).toHex()}'`);
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { hexToRgba, rgbaToHex, shade, tint, tone } from '@spa-tools/utilities';

//
// hexToRgba / rgbaToHex examples simply convert a hex
// color string to an rgba color string and vice versa
//
console.log('rgba(80, 146, 217, 0.8) to hex:', rgbaToHex('rgba(80, 146, 217, 0.8)'));
console.log('#5092d9cc to rgba:', hexToRgba('#5092d9cc'));

//
// shade examples modify the shade of a color by adding black
//
console.log('shade #5092d9 by exponential 0.5:', shade('#5092d9', 0.5).toHex());
console.log('shade #5092d9 by linear 0.5:', shade('#5092d9', 0.5, true).toHex());

//
// tint examples modify the tint of a color by adding white
//
console.log('tint #5092d9 by exponential 0.5:', tint('#5092d9', 0.5).toHex());
console.log('tint #5092d9 by linear 0.5:', tint('#5092d9', 0.5, true).toHex());

//
// tone examples modify the tone of a color by adding gray
//
console.log('tone #5092d9 by exponential 0.5:', tone('#5092d9', 0.5).toHex());
console.log('tone #5092d9 by linear 0.5:', tone('#5092d9', 0.5, true).toHex());
`;
