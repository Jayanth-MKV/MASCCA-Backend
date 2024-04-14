"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const supabase_provider_1 = require("../providers/supabase.provider");
let UploadService = class UploadService {
    constructor(uploadProvider) {
        this.uploadProvider = uploadProvider;
    }
    async fetchDataFromSupabase(folder) {
        const supabase = await this.uploadProvider.getClient();
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
    async downloadFileFromSupabase(filePath) {
        const supabase = await this.uploadProvider.getClient();
        console.log(filePath);
        const { data, error } = await supabase.storage.from('audio').download(filePath);
        console.log(data);
        if (error) {
            console.error('Failed to download file from Supabase:', error);
            return null;
        }
        return data;
    }
    async uploadFileToSupabase(file, folder, index, id) {
        const supabase = await this.uploadProvider.getClient();
        try {
            const uniqueFilename = `${index}_${id}_${file?.originalname}`;
            const folderPath = folder ? `${folder}/` : 'public';
            const { data, error } = await supabase.storage
                .from('audio')
                .upload(`${folderPath}/${uniqueFilename}`, file?.buffer, {
                contentType: file?.mimetype,
                upsert: true,
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to upload file to Supabase storage');
        }
    }
    async deleteFolderInSupabase(folderName) {
        const supabase = await this.uploadProvider.getClient();
        const files = await this.fetchDataFromSupabase(folderName);
        try {
            const filePaths = files.map((item) => (`${folderName}/${item.name}`));
            console.log(filePaths);
            const { data, error } = await supabase.storage
                .from('audio')
                .remove(filePaths);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
        catch (error) {
            throw new Error('Failed to delete folder in Supabase storage');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_provider_1.SupabaseProvider])
], UploadService);
//# sourceMappingURL=upload.service.js.map