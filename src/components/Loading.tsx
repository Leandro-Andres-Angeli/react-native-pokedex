import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const Loading = ({
  activityContainer,
}: {
  activityContainer: Record<string, any>;
}) => {
  return (
    <View style={activityContainer}>
      <ActivityIndicator size={50} color="grey" />
      <Text>Cargando...</Text>
    </View>
  );
};

export default Loading;
