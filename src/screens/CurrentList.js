import React from 'react'

import { View, Text, SafeAreaView } from 'react-native'

import nachos from '../data/nachos'
export default () => {
    console.log('Hello');
    return (
        <SafeAreaView>
            {nachos.map((item)=>{

                return <Text key={item.id}>{item.name}</Text>

            })}
        </SafeAreaView>

    )
};