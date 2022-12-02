import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

type TabsProperties = {
  title: string;
  component: React.ReactElement;
};

type BasicTabsProps = {
  tabs: TabsProperties[];
};

export const BasicTabs: React.FC<BasicTabsProps> = ({ tabs }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            {tabs.map((data: any, idx: number) => {
              return <Tab key={`tab-${idx}`} label={data.title} />;
            })}
          </Tabs>
        </Box>
        {tabs.map((data: any, idx: number) => {
          return (
            <TabPanel key={`tabPanel-${idx}`} index={idx} value={value}>
              {data.component}
            </TabPanel>
          );
        })}
      </Box>
    </>
  );
};
