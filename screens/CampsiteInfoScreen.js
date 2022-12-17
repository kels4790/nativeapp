import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal, } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import {toggleFavorite} from '../features/favorites/favoritesSlice'; 
import { useSelector, useDispatch } from 'react-redux'; 
 
const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const [showModal, setShowModal] = useState(false);
    
    const dispatch = useDispatch();

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
                <Text style={{fontSize: 12}}>
                    {`${item.author}, ${item.date}`}
                </Text>
            </View>
        )
    } 
    return (
            <>
            <FlatList 
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                    )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite 
                            campsite={campsite} 
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            /> 
            <Modal 
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!setShowModal)}

            >
                <View style={styles.modal}>
                    <View style={{ margin: 10 }}>
                        <Button 
                         title='cancel'
                         onPress={() => setShowModal(!showModal)}
                         color= '#808080'
                        />
                    </View>
                </View>
            </Modal>
            </>
            
            )
    
   
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16, 
        fontWeight:  '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20, 
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default CampsiteInfoScreen;
// {comments.filter(
//     (comment) => comment.campsiteId === campsite.id
// )}