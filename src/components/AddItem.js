import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
    },
    input: {
        backgroundColor: '#fff',
        fontSize: 18,
        borderRadius: 3,
    },
})

const AddItem = ({ onSubmitEditing }) => {
    const input = useRef(null);

    return (
        <View style={styles.container}>
            <TextInput 
                ref={input}
                style={styles.input}
                placeholder="Add a new item..."
                onSubmitEditing={evt => {
                    if(onSubmitEditing) {
                        onSubmitEditing(evt);
                    }
                    input.current.clear();
                }}
            />
        </View>
    )
}

export default AddItem
