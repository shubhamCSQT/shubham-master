/* eslint-disable quotes */
import { Box, Text, theme } from '@/atoms';
import CommonSolidButton from '@/components/CommonSolidButton/CommonSolidButton';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/navigators/MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { getCustomerDetails } from '@/redux/profileApi/ProfileApiAsyncThunk';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '@/components/CommonHeader/CommonHeader';

const PersonalDetailsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getUserDetails = useSelector(
    state => state?.getCustomerDetailsApiSlice?.customerDetails?.data || [],
  );

  const onPressLogout = () => {
    signOut();
  };
  useEffect(() => {
    dispatch(getCustomerDetails(`user-details/tarundrupal@yopmail.com`));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.sushiittoRed} />
        </View>
      ) : (
        <>
          {getUserDetails ? (
            <View style={styles.profileDetailsContainer}>
              <ProfileRow
                label="First Name"
                value={getUserDetails?.userProfile?.firstName}
              />
              <ProfileRow
                label="Last Name"
                value={getUserDetails?.userProfile?.lastName}
              />
              <ProfileRow
                label="Email"
                value={getUserDetails?.userProfile?.email}
              />
              <ProfileRow
                label="state"
                value={getUserDetails?.userProfile?.state}
              />
              {/* <ProfileRow label="Date Of Birth" value={profileDataAttributes.dateOfBirth} /> */}
            </View>
          ) : (
            ''
          )}
        </>
      )}
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <CommonSolidButton title="LOGOUT" onPress={onPressLogout} />
      </View>
    </SafeAreaView>
  );
};

const ProfileRow = ({ label, value }) => {
  return (
    <View style={styles.profileRow}>
      <Text variant="bold18" style={styles.label}>
        {label}
      </Text>
      <Text variant="bold18" style={styles.value}>
        {value}
      </Text>
    </View>
  );
};
export default PersonalDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  logoutButtonContainer: {
    padding: 20,
  },
});
