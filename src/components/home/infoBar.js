import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Badge } from '@rneui/themed';

const InfoBar = ({
  is0000,
  titleText,
  subtitleText,
  badgeText,
  isBadgeRed,
  leftSwipeBtn,
  onPressFunc
}) => {
  const InfoBarContent = () => (
    <>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          {titleText}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {subtitleText}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Badge
        value={badgeText}
        status={isBadgeRed ? 'error' : 'success'}
      />
      <ListItem.Chevron color="#707070" style={{ marginLeft: 10 }} />
    </>
  );

  return (
    <View style={styles.container}>
      {is0000 ? (
        <ListItem
          containerStyle={styles.listItemContainer}
          onPress={onPressFunc}
          underlayColor="#ddd"
        >
          <InfoBarContent />
        </ListItem>
      ) : (
        <ListItem.Swipeable
          containerStyle={styles.listItemContainer}
          onPress={onPressFunc}
          underlayColor="#ddd"
          leftContent={(reset) => leftSwipeBtn(reset)}
        >
          <InfoBarContent />
        </ListItem.Swipeable>
      )}
    </View>
  );
};

export default InfoBar;

const styles = StyleSheet.create({
  container: {
    height: 72,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItemContainer: {
    borderRadius: 5
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
});
