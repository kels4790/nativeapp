import { ScrollView } from "react-native-gesture-handler";
import { Card } from 'react-native-elements';
import { Text } from "react-native";
import * as Animatable from 'react-native-animatable';


const ContactScreen = () => {
    return (
        <ScrollView>
               <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
                >
            <Card.Title style={{paddingTop: 15}}>Contact Information</Card.Title>
            <Card.Divider />
            <Card wrapperStyle={{ margin: 10 }}>
                <Text>1 Nucamp Way</Text>
                <Text>Seattle, WA 98001</Text>
                <Text style={{marginBottom: 10}}>U.S.A</Text>

                <Text>Phone: 1-206-555-1234</Text>
                <Text>Email: campsites@nucamp.co</Text>
            </Card>
            </Animatable.View>
        </ScrollView>
    )
}

export default ContactScreen; 