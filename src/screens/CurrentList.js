import React from 'react';
import { SectionList, Text, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import ListItem, { SectionHeader, Separator } from '../components/ListItem';
import AddItem from '../components/AddItem';
import { useCurrentList } from '../util/ListManager';

export default ({ navigation }) => {
    const {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorite,
        addToFavorite,
    } = useCurrentList();

    if(loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    console.log('Favorite', favorite);
    console.log('list', list);

    return (
        <SafeAreaView style={{ flex: 1}}>
            <KeyboardAvoidingView 
                style={{ flex: 1}}
                bahavior="padding"
            >
                <SectionList 
                    // data={list}
                    sections={[
                        { title: "List", data: list },
                        { title: "Cart", data: cart }
                    ]}
                    renderSectionHeader={({ section }) => (
                        <SectionHeader title={section.title} />
                    )}
                    renderItem={({ item, index }) => (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => addToFavorite(item)}
                            isFavorite={favorite.find(items => items.id === item.id) ? true : false}
                            onAddedSwipe={() => addToCart(item)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => {
                                navigation.navigate('ItemDetails', { item })
                            }}
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