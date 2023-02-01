import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * Genera una vista en pestañas
 * @param
 * @returns
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3}}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

type TabProps = {
  label: string,
  component: React.ReactNode
}

type TabsProps = {
  tab1: TabProps,
  tab2: TabProps,
}

/**
 * genera dos prestañas donde cada pestaña recibe un componente contenedor
 * @param
 * @returns
 */
const TwoTabs: React.FC<TabsProps> = ({tab1, tab2}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="Two tabs for components">
          <Tab label={tab1.label} {...a11yProps(0)} />
          <Tab label={tab2.label} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {tab1.component}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tab2.component}
      </TabPanel>
    </Box>
  );
}

export default TwoTabs;
