import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const TicketsScreen = ({navigation}) => {
  const [journeyFrom, setJourneyFrom] = useState('');
  const [journeyTo, setJourneyTo] = useState('');
  const [display, setDisplay] = useState({
    isModalVisible: false,
    journeys: [],
  });

  /**
   * Toggles the visibility of the modal
   * @param isVisible
   */
  const setModalVisibility = isVisible => {
    setDisplay({isModalVisible: isVisible, journeys: display.journeys});
  };

  /**
   * Adds a new journey
   */
  const addJourney = () => {
    const journey = {
      id: Math.random().toString(),
      from: journeyFrom,
      to: journeyTo,
    };
    const journeys = display.journeys;
    journeys.push(journey);
    setDisplay({isModalVisible: display.isModalVisible, ...journeys});
  };

  return (
    <View style={styles.root}>
      <View style={styles.viewSeeTravels}>
        <Text style={styles.textSeeTravels}>See your</Text>
        <Text style={styles.textSeeTravels}>travels</Text>
      </View>
      <View style={styles.ticketsSearchIconContainer}>
        <TextInput style={styles.textInputTicketsSearch} />
        <Image
          style={styles.ticketsSearchIcon}
          source={require('../resources/search.png')}
        />
      </View>
      <FlatList
        data={display.journeys}
        keyExtractor={journey => journey.id}
        renderItem={({item}) => (
          <View style={styles.journeyView}>
            <View style={styles.imageTrainLogoContainer}>
              <Image source={require('../resources/train_placeholder.png')} />
            </View>
            <View style={styles.journeyDetails}>
              <Text>{item.from}</Text>
              <Image source={require('../resources/arrow-circle-right.png')} />
              <Text>{item.to}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setModalVisibility(!display.isModalVisible);
        }}>
        <Text style={styles.textPlusSymbol}>+</Text>
      </TouchableOpacity>
      <Modal isVisible={display.isModalVisible} hasBackdrop={false}>
        <View style={styles.modal}>
          <View>
            <TextInput
              style={styles.textInputStation}
              placeholder="Departure Station:"
              onChangeText={text => setJourneyFrom(text)}
            />
            <TextInput
              style={styles.textInputStation}
              placeholder="Destination Station:"
              onChangeText={text => setJourneyTo(text)}
            />
          </View>
          <Text style={styles.selectDate}>Select Date</Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={() => setModalVisibility(false)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addJourney();
                setModalVisibility(false);
              }}>
              <Text style={styles.modalButton}>Add Journey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TicketsScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: 'rgba(104, 126, 252, 0.1)',
    ...StyleSheet.absoluteFillObject,
  },
  viewSeeTravels: {
    marginBottom: 10,
  },
  textSeeTravels: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#190320',
    fontFamily: 'sans-serif-thin',
  },
  ticketsSearchIconContainer: {
    height: 60,
    marginTop: 10,
  },
  ticketsSearchIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  textInputTicketsSearch: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    fontFamily: 'sans-serif-light',
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#687DFC',
  },
  textPlusSymbol: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  modal: {
    backgroundColor: 'rgb(104, 126, 252)',
    borderRadius: 8,
    padding: 15,
  },
  textInputStation: {
    borderColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    height: 50,
    padding: 10,
    margin: 5,
    backgroundColor: '#FFFFFF',
    fontFamily: 'sans-serif-light',
  },
  selectDate: {
    fontFamily: 'sans-serif-thin',
    fontSize: 15,
    color: '#FFFFFF',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-medium',
    margin: 5,
    fontSize: 15,
  },
  journeyView: {
    flexDirection: 'row',
    marginTop: 10,
    height: 80,
  },
  imageTrainLogoContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    margin: 1,
    width: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  journeyDetails: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    padding: 10,
    margin: 1,
    flex: 1,
    color: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
});
