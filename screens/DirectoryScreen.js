import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';


const DirectoryScreen = ({ navigation }) => {
    const [campsites, setCampsites] = useState(CAMPSITES);

    if(campsites.isLoading) {
        return <Loading />
    }
    if (campsites.errMess){
        return(
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        )
    }

    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
            <ListItem
                onPress={() =>
                    navigation.navigate('CampsiteInfo', { campsite })
                }
            >
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        {campsite.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            </Animatable.View>
        );
    };
    return (
        <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;