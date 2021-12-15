import firebase from '../helpers/db';
import Feedback from '../models/feedback'


const firestore = firebase.firestore();

export const getFeedbacks = async () => {
    try {
        const response = await firestore.collection('feedbacks');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const feedback = new Feedback(
                doc.id,
                doc.data().feedback,
                
            );

            array.push(feedback);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addFeedback = async (feedback) => {
    try {
        await firestore.collection('feedbacks').doc().set(feedback);
    } catch (error) {
        throw error;
    }
}

export const getFeedback = async (id) => {
    try {
        const feedback = await firestore.collection('feedbacks').doc(id);
        const data = await feedback.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateFeedback = async (id, data) => {
    try {
        const feedback = await firestore.collection('feedbacks').doc(id);
        await feedback.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteFeedback = async (id) => {
    try {
        await firestore.collection('feedbacks').doc(id).delete();
    } catch (error) {
        throw error;
    }
}