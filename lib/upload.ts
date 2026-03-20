import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Helper untuk upload file ke Firebase Storage
 * @param file Objek File dari input HTML
 * @param folderName Nama folder (contoh: 'profile', 'certificates', 'cv')
 * @param onProgress Callback untuk update progress bar UI (0-100)
 * @returns Promise<string> URL publik dari foto/file yang diupload
 */
export const uploadFileToStorage = async (
  file: File,
  folderName: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  if (!file) throw new Error("File tidak ditemukan.");

  return new Promise((resolve, reject) => {
    // Buat nama file unik: folder/timestamp_namagambar.png
    const uniqueFileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const storageRef = ref(storage, `${folderName}/${uniqueFileName}`);

    // Mulai proses upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Hitung persentase
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        // Jika sukses, ambil URL publiknya
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
