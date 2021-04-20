import React from 'react';
import { SafeAreaView, FlatList, KeyboardAvoidingView } from 'react-native';

import { useCurrentList } from '../util/ListManager';
// import { Separator } from '../components/ListItem';
import ListItem, { Separator } from '../components/ListItem';

export default () => {
    const {
       favorite,
       removeFavorite,
    } = useCurrentList();

    console.log('Favorite', favorite);
    console.log('It works');

    return (
        <SafeAreaView style={{ flex: 1}}>
            <KeyboardAvoidingView 
                style={{ flex: 1}}
                bahavior="padding"
            >
                <FlatList
                    data={favorite}
                    renderItem={({ item, index }) => (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => removeFavorite(item.id)}
                            isFavorite={true}
                            onRowPress={() => {
                                navigation.navigate('ItemDetails', { item })
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}