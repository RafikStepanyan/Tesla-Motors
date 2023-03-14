import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import { db } from './Firebase';

type TypeFirestore = {
    collectionName: string;
    id?: string;
    obj?: any;
};


export const addData = async ({ collectionName, obj }: TypeFirestore): Promise<string> => {
    const col = collection(db, collectionName);
    const id = await addDoc(col, obj);
    return id.id;
};

export const findAll = async ({ collectionName }: TypeFirestore): Promise<any> => {
    const col = collection(db, collectionName);
    const arr = await getDocs(col);
    const data = arr.docs.map((e: any) => {
        return { ...e.data(), id: e.id };
    });
    return data;
};

export const findOne = async ({ collectionName, id }: TypeFirestore): Promise<any> => {
    const col = collection(db, collectionName);
    const data = await getDoc(doc(col, id));
    return { ...data.data(), id: data.id };
};

export const findAllByField = async ({ collectionName, obj }: TypeFirestore): Promise<any> => {
    const col = collection(db, collectionName);
    const arr: any = [];
    for (let key in obj) {
        arr.push(where(key, "==", obj[key]));
    }
    const q = query(col, ...arr);
    const arr1 = await getDocs(q);
    const data = arr1.docs.map((e: any) => {
        return { ...e.data(), id: e.id };
    });
    return data;
};

export const deleteById = async ({ collectionName, id }: TypeFirestore): Promise<string> => {
    const col: any = collection(db, collectionName);
    await deleteDoc(doc(col, id));
    return 'deleted';
};

export const updateById = async ({ collectionName, id, obj }: TypeFirestore): Promise<string> => {
    const col = collection(db, collectionName);
    await updateDoc(doc(col, id), obj);
    return 'updated';
};

class Firestore {
    static async addData(collectionName: string, obj: any): Promise<string> {
        const col = collection(db, collectionName);
        await addDoc(col, obj);
        return 'added';
    }
    static async deleteDataById(collectionName: string, id: any): Promise<string> {
        const col: any = collection(db, collectionName);
        await deleteDoc(doc(col, id));
        return 'deleted';
    }
    static async updateDataById(collectionName: string, id: any, obj: any): Promise<string> {
        const col = collection(db, collectionName);
        await updateDoc(doc(col, id), obj);
        return 'updated';
    }
    static async getDataById(collectionName: string, id: any): Promise<any> {
        const col = collection(db, collectionName);
        const data = await getDoc(doc(col, id));
        return { ...data.data(), id: data.id };
    }
    static async getData(collectionName: string): Promise<any> {
        const col = collection(db, collectionName);
        const arr = await getDocs(col);
        const data = arr.docs.map((e: any) => {
            return { ...e.data(), id: e.id };
        });
        return data;
    }
    static async getUserByEmail(collectionName: string, email: string): Promise<any> {
        const col = collection(db, collectionName);
        const q = query(col, where("email", "==", email));
        const arr = await getDocs(q);
        const data = arr.docs.map((e: any) => {
            return { ...e.data(), id: e.id };
        });
        return data[0];
    }
    static async getDataByQuery(collectionName: string, obj: any): Promise<any> {
        const col = collection(db, collectionName);
        const harcum: any = [];
        for (let key in obj) {
            harcum.push(where(key, "==", obj[key]));
        }
        const q = query(col, harcum);
        const arr = await getDocs(q);
        const data = arr.docs.map((e: any) => {
            return { ...e.data(), id: e.id };
        });
        return data;
    }
};

export default Firestore;