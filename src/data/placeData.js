import firebase from '../helpers/db';
import Map from '../models/place'


const firestore = firebase.firestore();

export const getMaps = async () => {
    try {
        const response = await firestore.collection('maps');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const map = new Map(
                doc.id,
                doc.data().detail,
                doc.data().imageurl,
                doc.data().title,
            );

            array.push(map);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addMap = async (map) => {
    try {
        await firestore.collection('maps').doc().set(map);
    } catch (error) {
        throw error;
    }
}

export const getMap = async (id) => {
    try {
        const map = await firestore.collection('maps').doc(id);
        const data = await map.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateMap = async (id, data) => {
    try {
        const map = await firestore.collection('maps').doc(id);
        await map.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteMap = async (id) => {
    try {
        await firestore.collection('maps').doc(id).delete();
    } catch (error) {
        throw error;
    }
}