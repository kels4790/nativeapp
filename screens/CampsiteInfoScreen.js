import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal, } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import {toggleFavorite} from '../features/favorites/favoritesSlice'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { Input, Rating } from 'react-native-elements';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] =useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newComment = {
            campsiteId: campsite.id,
            rating: rating,
            author: author,
            text: text,
        }
        console.log(newComment);
        setShowModal(!showModal);

    }

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    }
    
    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
            <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{
                    fontSize: 14, 
                    paddingTop: 15,
                    fontWeight: 'bold'
                    }}>
                        -{`${item.author}, ${item.date}`}
                </Text>
               <Rating 
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems: 'flex-start', paddingVertical: '5%'}}   
                    showRating
                    readOnly
               />
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

                    <Rating 
                        showRating={true}
                        startingValue={rating}
                        imageSize={40}fw3cq
                        onFinishRating={(rating)=> setRating(rating)} 
                        style={{ paddingVertical: 10 }}
                    />
                    <Input 
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        leftIconContainerStyle={{ paddingRight: 10}}
                        onChangeText={(author) => setAuthor(author)}    
                        value={author}
                    />
                    <Input 
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                        leftIconContainerStyle={{ paddingRight: 10}}
                        onChangeText={(text) => setText(text)}  
                        value={text}
                    />
                   
                   <View style={{ margin: 10 }}>
                        <Button 
                         title='submit'
                         onPress={() => {
                            handleSubmit();
                            resetForm();
                        }}
                         color= '#5637DD'
                        />
                    </View>
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

{/* <Text style={{fontSize: 14}}>{item.text}</Text>
<Text style={{fontSize: 12}}>{item.rating}</Text>
<Text style={{fontSize: 12}}>
    {`${item.author}, ${item.date}`}
</Text> */}