import React, { useEffect } from 'react';
import { Box, Text, theme } from '@atoms';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../auth/LoginScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsUserLoggedIn } from '@/hooks/useIsUserLoggedIn';
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { isUserLoggedIn } = useIsUserLoggedIn();

  const dataArray = [
    {
      name: 'Profile',
      onPress: function () {
        isUserLoggedIn
          ? navigation.navigate('PersonalDetailsScreen')
          : navigation.navigate('LoginScreen');
      },
    },
    {
      name: 'Your Orders',
      onPress: function () {},
    },

    {
      name: 'Language',
      onPress: function () {},
    },

    {
      name: 'Add Address',
      onPress: function () {},
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() => {
          item.onPress();
        }}
      >
        <Box flexDirection="row" alignItems="center">
          <Text variant="regular18" style={{ paddingLeft: 10 }}>
            {item.name}
          </Text>
        </Box>
        <Box>
          <Text>→</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box style={{ paddingTop: insets.top }} backgroundColor="" flex={1}>
      {true ? (
        <>
          <Box flex={1}>
            <FlatList
              data={dataArray}
              renderItem={renderItem}
              key={Math.random()}
            />
          </Box>
        </>
      ) : (
        <>
          <LoginScreen />
        </>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.paddingHorizontal,
    justifyContent: 'space-between',
  },
});
