import { collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { StorageAdapter } from './storage.adapter';

export class FirebaseStorage implements StorageAdapter {
  /**
   * Salva ou atualiza um valor no Firestore
   * @param key nome da chave (string)
   * @param value qualquer objeto ou valor serializável
   */
  async save(key: string, value: unknown): Promise<void> {
    const ref = doc(collection(db, 'storage'), key);
    await setDoc(ref, { value, updatedAt: new Date() });
  }

  /**
   * Lê um valor armazenado
   * @param key nome da chave (string)
   * @returns o valor armazenado ou null se não existir
   */
  async load<T = unknown>(key: string): Promise<T | null> {
    const ref = doc(collection(db, 'storage'), key);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;
    return snapshot.data().value as T;
  }

  /**
   * Remove um valor armazenado
   * @param key nome da chave (string)
   */
  async remove(key: string): Promise<void> {
    const ref = doc(collection(db, 'storage'), key);
    await deleteDoc(ref);
  }
};