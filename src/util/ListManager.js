import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import {v4 as uuid } from 'uuid';

const updateStoredCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
}

const updateStoredCurrentCart = (cart) => {
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(cart));
}

const updateStoredCurrentFavorite = (favorite) => {
    AsyncStorage.setItem('@@GroceryList/currentFavorite', JSON.stringify(favorite));
}

export const useCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite]= useState([]);

    const addItem = (text) => {
        const newList = [{ id: uuid(), name: text}, ...list];
        setList(newList);
        updateStoredCurrentList(newList);
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        updateStoredCurrentList(newList);
    }

    const addToCart = (item) => {
        removeItem(item.id);
        const newCart = [item, ...cart];
        setCart(newCart);
        updateStoredCurrentCart(newCart);
    }

    const addToFavorite = (item) => {
        const newFavorite = [item, ...favorite];
        setFavorite(newFavorite);
        updateStoredCurrentFavorite(newFavorite);
    }

    const removeFavorite = (id) => {
        const newFavorite = favorite.filter(item => item.id !== id);
        setFavorite(newFavorite);
        updateStoredCurrentList(newFavorite);
    }

    useEffect(() => {
        setTimeout(() => {
            Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'),
                AsyncStorage.getItem('@@GroceryList/currentCart'),
                AsyncStorage.getItem('@@GroceryList/currentFavorite'),
            ])
            .then(([list, cartItems, favorited]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(favorited)])
            .then(([list, cartItems, favorited]) => {
                if(list) {
                    setList(list);
                }
                if(cartItems) {
                    setCart(cartItems);
                }
                if(favorited) {
                    setFavorite(favorited);
                }
                setLoading(false);
            })
        }, 2000);
    }, []);

    //  AsyncStorage.clear();

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorite,
        addToFavorite,
        removeFavorite,
    }
}
