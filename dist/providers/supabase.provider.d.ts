import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseProvider {
    private readonly supabase;
    constructor(configService: ConfigService);
    getClient(): Promise<SupabaseClient>;
}
