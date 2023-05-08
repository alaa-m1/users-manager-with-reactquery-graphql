import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostsByUserCard from './views/PostsByUserCard';
import PostsByUser from './views/PostsByUser';

const UsersReview = () => {
  const [tabIndex, setTabIndex] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Users Review">
            <Tab label="Posts By User Cards" value="1" />
            <Tab label="Posts By Users" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><PostsByUserCard/></TabPanel>
        <TabPanel value="2"><PostsByUser/></TabPanel>
      </TabContext>
    </Box>
  );
};
export default UsersReview;
