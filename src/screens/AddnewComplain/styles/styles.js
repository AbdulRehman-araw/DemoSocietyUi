import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  viewAttach: {
  },
  textArea: {
    fontSize: width * 0.036,
    color: colors.black,
  },
  Togglecard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 12,
    borderWidth: 0.5,
    marginTop: 10,
    height: width * 0.18,
    borderColor: colors.gray,
  },
  headingStyle: {
    color: colors.black,
    fontSize: width * 0.042,
    marginVertical: 10,
  },
});
