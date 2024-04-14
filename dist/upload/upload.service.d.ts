/// <reference types="multer" />
import { SupabaseProvider } from 'src/providers/supabase.provider';
export declare class UploadService {
    private readonly uploadProvider;
    constructor(uploadProvider: SupabaseProvider);
    fetchDataFromSupabase(folder: string): Promise<any>;
    downloadFileFromSupabase(filePath: string): Promise<Blob | null>;
    uploadFileToSupabase(file: Express.Multer.File, folder: string, index: string, id: string): Promise<any>;
    deleteFolderInSupabase(folderName: string): Promise<any>;
}
