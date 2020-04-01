import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {stations} from '../utils/stations';

const TrainDepartureBoardScreen = ({navigation}) => {
  const [station, setStation] = useState('');
  const [stationsSuggestions, setStationsSuggestions] = useState([]);
  const [departures, updateDepartures] = useState([
    {id: '0', departure: 'Falmer', destination: 'Brighton'},
    {id: '1', departure: 'Manchester', destination: 'London Euston'},
    {id: '2', departure: 'Picadilly', destination: 'Knutsford'},
    {id: '3', departure: 'Bradford', destination: 'London Road'},
    {id: '4', departure: 'Croydon', destination: 'Mouslecoomb'},
  ]);

  useEffect(() => {
    async function getLiveTrainUpdates() {}
    getLiveTrainUpdates();
  }, []);

  /**
   * Returns matching stations
   * @param stationName
   */
  const searchStation = stationName => {
    setStation(stationName);
    const results = stations.names.filter(station => {
      return station.toLowerCase().startsWith(stationName.toLowerCase());
    });
    if (stationName === '') {
      setStationsSuggestions([]);
    } else {
      console.log(stationName);
      setStationsSuggestions(results.slice(0, 5));
    }
  };

  /**
   * Make a GET call to pull departure information about a particular station
   * @returns {Promise<void>}
   */
  const fetchDepartures = async () => {
    if (station !== '') {
      fetch(
        `http://esrs.herokuapp.com/api/departures/${station.toLowerCase()}`,
      ).then(async response => {
        const json = await response.json();
        console.log(json);
      });
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.seeTravelsContainer}>
        <View style={styles.viewSeeTravels}>
          <Text style={styles.textSeeTravels}>Departures</Text>
        </View>
      </View>
      <View style={styles.ticketsSearchIconContainer}>
        <TextInput
          value={station}
          placeholder="Station"
          style={styles.textInputTicketsSearch}
          onChangeText={text => searchStation(text)}
        />
        <TouchableOpacity
          onPress={() => fetchDepartures()}
          style={styles.ticketsSearchIcon}>
          <Image source={require('../resources/search.png')} />
        </TouchableOpacity>
        <FlatList
          data={stationsSuggestions}
          keyExtractor={station => station}
          showsHorizontalScrollIndicator={true}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setStation(stations.stationsAndCodes.get(station));
                setStationsSuggestions([]);
              }}>
              <Text style={styles.listItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={departures}
        extraData={departure => departure}
        keyExtractor={departure => departure.id}
        contentContainerStyle={
          departures.length > 0 ? styles.emptyStateNull : styles.emptyState
        }
        ListEmptyComponent={() => (
          <Image source={require('../resources/empty_state.png')} />
        )}
        renderItem={({item, index}) => (
          <View style={[styles.journeyView, item.style]}>
            <View style={styles.journeyDetails}>
              <Text>{item.departure}</Text>
              <Image source={require('../resources/arrow-circle-right.png')} />
              <Text>{item.destination}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TrainDepartureBoardScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: 'rgba(104, 126, 252, 0.1)',
    ...StyleSheet.absoluteFillObject,
  },
  seeTravelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  listItem: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    color: '#000000',
  },
  journeyView: {
    flexDirection: 'row',
    marginTop: 10,
    height: 80,
  },
  journeyViewSelected: {
    opacity: 0.5,
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
  emptyState: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateNull: {},
});