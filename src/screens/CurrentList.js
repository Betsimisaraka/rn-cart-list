import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

// import nachos from '../data/nachos';

import ListItem, { Separator } from '../components/ListItem';
import AddItem from '../components/AddItem';
import { useCurrentList } from '../util/ListManager';

export default () => {
    const {
        list,
        loading,
        addItem,
        removeItem,
    } = useCurrentList();

    if(loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <KeyboardAvoidingView 
                style={{ flex: 1}}
                bahavior="padding"
            >
                <FlatList 
                    data={list}
                    renderItem={({ item, index }) => (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => alert('todo: handle favorite')}
                            isFavorite={index < 2}
                            onAddedSwipe={() => removeItem(item.id)}
                            onDeleteSwipe={() => removeItem(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent={() => (
                        <AddItem 
                            onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)}
                        />
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //             {nachos.map((item, index)=>(
    //                 <React.Fragment key={item.id}>
    //                     <ListItem 
    //                         name={item.name}
    //                         onFavoritePress={() => alert('todo: handle favorite')}
    //                         isFavorite={index < 2}
    //                     />
    //                     <Separator />
    //                 </React.Fragment>
    //             ))}
    //         </ScrollView>
    //     </SafeAreaView>
    // )
};