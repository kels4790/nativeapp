import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, ListItem } from "react-native-elements";
import { SwipeRow } from "react-native-swipe-list-view";
import Loading from '../components/LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { toggleFavorite } from "../features/favorites/favoritesSlice";


const FavoritesScreen = ({ navigation }) => {
    
    const dispatch = useDispatch();

    const { campsitesArray, isLoading, errMess } = useSelector(
        (state) => state.campsites
    );
    const favorites = useSelector((state) => state.favorites);

    const renderFavoriteItem = ({item: campsite}) => {

            return (
               <SwipeRow rightActionValue={-150}>
                    <View style={styles.deleteView}>
                        <TouchableOpacity 
                            style={styles.deleteTouchable}
                            onPress={() => dispatch(toggleFavorite(campsite.id))}
                            SwipeBasedUi
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem 
                            onPress={() =>
                                navigation.navigate('Directory', {
                                    screen: 'CampsiteInfo',
                                    params: { campsite }
                                })
                            }
                        >
                            <Avatar rounded source={{ uri: baseUrl + campsite.image }} />

                            <ListItem.Content>
                                <ListItem.Title>
                                    {campsite.name}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </View>
                
                </SwipeRow>
            )
    }
  

    if(isLoading) {
        return (
            <Loading />
        )
    } 

    if(errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={campsitesArray.filter(
                (campsite) => favorites.includes(campsite.id)
            )}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
        />
    )

}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1

    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'

    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16, 
        width: 150
    }
})

export default FavoritesScreen; 