import { Box, Button, Text } from '@/atoms';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
const ViewAddress = ({ userAddress }) => {
  const navigation = useNavigation();
  const address = userAddress.item;
  return (
    <Box
      borderRadius={8}
      borderColor="border"
      borderWidth={1}
      mb="s8"
      padding="s8"
      flex={1}
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <Box mt="s14">
        <Text>
          {address.firstName} {address.lastName}
        </Text>
        <Text>{address.addressNumber}</Text>
        <Text>
          {address.city} {address.country ? ',' : ''} {address.country}
        </Text>
        <Text>
          {address.state} {address.postalCode}
        </Text>
        <Text>{address.phone}</Text>
      </Box>
      <Box mt="s12" mb="s12" justifyContent="flex-start" flexDirection="row">
        <Button
          title="EDIT ADDRESS"
          textColor="#0a0a0a"
          onPress={() => navigation.navigate('AddAddress')}
        />
      </Box>
    </Box>
  );
};
export default ViewAddress;
