import { useState } from 'react';
import { Text, View, ScrollView, Switch, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleReservation = () => {
        console.log('campers:', campers);
        console.log('hikeIn:', hikeIn);
        console.log('date:', date);
    };

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
        console.log(campers);
        console.log(hikeIn);
        console.log(date);
        console.log(showCalendar);
    }

    const presentLocalNotifcation = async (reservationDate) => {
            const sendNotification = () => {
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true, 
                        shouldPlaySound: true, 
                        shouldSetBadge: true
                    })
                });

                Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Your Campsite Reservation Search',
                        body: `Search Reservations for ${reservationDate}`
                    },
                    trigger: null
                });
            }

            let permissions = await Notifications.getPermissionsAsync();
            if(!permissions.granted) {
                permissions = await Notifications.requestPermissionsAsync();
            }
            if (permissions.granted) {
                sendNotification();
            }

    }

    return (
        <ScrollView>
            <Animatable.View
                animation={'zoomIn'}
                duration={2000}
            >
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
                <Text style={{flex: 2}}>Number of Campers:</Text>
                <Picker
                    style={{flex: 2}}
                    selectedValue={campers}
                    onValueChange={(itemValue) => setCampers(itemValue)}
                >
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='5' value={5} />
                    <Picker.Item label='6' value={6} />
                </Picker>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
                <Text style={{flex: 2}}>Hike In?</Text>
                <Switch
                    style={{flex: 1}}
                    value={hikeIn}
                    trackColor={{ true: '#5637DD', false: null }}
                    onValueChange={(value) => setHikeIn(value)}
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
                <Text style={{flex: 1}}>Date:</Text>
                <Button
                    style={{flex: 4}}
                    onPress={() => setShowCalendar(!showCalendar)}
                    title={date.toLocaleDateString('en-US')}
                    color='#5637DD'
                    accessibilityLabel='Tap me to select a reservation date'
                />
            </View>
            {showCalendar && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onDateChange}
                />
            )}
            <View>
                <Button
                   onPress={
                    () => Alert.alert('Begin Search?', 'Number of Campers: ' + campers + '\n' + 'Hike-In?: ' + hikeIn + '\n' + 'Date: ' + date +'\n',   
                     [
                            
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        presentLocalNotifcation(
                                            date.toLocaleDateString('en-US')
                                            );
                                        handleReservation();
                                        resetForm();
                                    }
                
                                },
                        
                            {
                                text: 'CANCEL',
                                onPress: () => {
                                    console.log('Search Canceled');
                                    resetForm();
                                }
                            }
                
                     ]
                
                    )
                 }
                
                    title='Search Availability'
                    color='#5637DD'
                    accessibilityLabel='Tap me to search for available campsites to reserve'
                />
            </View>
    
            </Animatable.View>
        </ScrollView>
    );
};




export default ReservationScreen;

