import { Box, Text } from '@/atoms';
import CommonSolidButton from '@/components/CommonSolidButton/CommonSolidButton';
import React, { useContext } from 'react';
import { AuthContext } from '@/navigators/MainNavigator';
const PersonalDetailsScreen = () => {
  const { signOut } = useContext(AuthContext);

  const onPressLogout = () => {
    signOut();
  };
  return (
    <Box>
      <Text>user Personal details</Text>
      <Box paddingHorizontal="s10" paddingBottom="s10">
        <CommonSolidButton title="LOGOUT" onPress={onPressLogout} />
      </Box>
    </Box>
  );
};
export default PersonalDetailsScreen;
