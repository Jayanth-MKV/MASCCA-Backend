import { Injectable } from '@nestjs/common';
import { SupabaseProvider } from 'src/providers/supabase.provider';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private readonly uploadProvider: SupabaseProvider) {}

  async fetchDataFromSupabase(folder:string): Promise<any> {
    const supabase = await this.uploadProvider.getClient();
    // Use the Supabase client to fetch data
    const { data, error } = await supabase.storage
      .from('audio')
      .list(`${folder}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    return data;
  }

  async downloadFileFromSupabase(filePath: string): Promise<Blob | null> {
    const supabase = await this.uploadProvider.getClient();
  
    console.log(filePath);
    // Download the file from Supabase
    const { data, error } = await supabase.storage.from('audio').download(filePath);
  
    console.log(data);

    
    if (error) {
      console.error('Failed to download file from Supabase:', error);
      return null;
    }

    return data;
    
    // Convert Blob to Buffer
    // const reader = new FileReader();
    // const bufferPromise = new Promise<Buffer>((resolve, reject) => {
    //   reader.onload = () => {
    //     const buffer = Buffer.from(reader.result as ArrayBuffer);
    //     resolve(buffer);
    //   };
    //   reader.onerror = (error) => {
    //     console.error('Error reading file as ArrayBuffer:', error);
    //     reject(error);
    //   };
    // });
    
    // reader.readAsArrayBuffer(data);
  
    // return bufferPromise;
  }
  

  async uploadFileToSupabase(
    file: Express.Multer.File,
    folder: string,
    index:string,
    id:string
  ): Promise<any> {
    const supabase = await this.uploadProvider.getClient();
    try {
      const uniqueFilename = `${index}_${id}_${file?.originalname}`;
      const folderPath = folder ? `${folder}/` : 'public'; // Handle folder structure if specified

      const { data, error } = await supabase.storage
        .from('audio')
        .upload(`${folderPath}/${uniqueFilename}`, file?.buffer, {
          contentType:file?.mimetype,
          upsert: true,
        });
      if (error) {
        throw new Error(error.message);
      }
      return data; // Return the key or URL of the uploaded file
    } catch (error) {
      console.log(error);
      throw new Error('Failed to upload file to Supabase storage');
    }
  }

  async deleteFolderInSupabase(folderName: string): Promise<any> {
      const supabase = await this.uploadProvider.getClient();
      const files = await this.fetchDataFromSupabase(folderName);
      try {
          const filePaths= files.map((item) => (`${folderName}/${item.name}`));
          console.log(filePaths);
      const { data, error } = await supabase.storage
        .from('audio')
        .remove(filePaths);
      if (error) {
        throw new Error(error.message);
        }
        return data
    } catch (error) {
      throw new Error('Failed to delete folder in Supabase storage');
    }
  }
}
