import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { SiJavascript, SiReact, SiTypescript } from 'react-icons/si';
import styles from './styles.module.css';

interface CodeTabsProps {
  jsCode?: JSX.Element;
  reactJsCode?: JSX.Element;
  reactTsCode?: JSX.Element;
  tsCode?: JSX.Element;
}

export function CodeTabs({ jsCode, reactJsCode, reactTsCode, tsCode }: CodeTabsProps) {
  return (
    <Tabs className={styles.codeTab}>
      {!!tsCode && (
        <TabItem default label={(<SiTypescript fontSize='1.75rem' />) as unknown as string} value='ts'>
          {tsCode}
        </TabItem>
      )}
      {!!jsCode && (
        <TabItem label={(<SiJavascript fontSize='1.75rem' />) as unknown as string} value='js'>
          {jsCode}
        </TabItem>
      )}
      {!!reactTsCode && (
        <TabItem
          label={
            (
              <div style={{ alignItems: 'center', display: 'flex', fontSize: '1.75rem', gap: '0.25rem' }}>
                <SiTypescript />
                +
                <SiReact />
              </div>
            ) as unknown as string
          }
          value='reactTS'
        >
          {reactTsCode}
        </TabItem>
      )}
      {!!reactJsCode && (
        <TabItem
          label={
            (
              <div style={{ alignItems: 'center', display: 'flex', fontSize: '1.75rem', gap: '0.25rem' }}>
                <SiJavascript />
                +
                <SiReact />
              </div>
            ) as unknown as string
          }
          value='reactJS'
        >
          {reactJsCode}
        </TabItem>
      )}
    </Tabs>
  );
}
