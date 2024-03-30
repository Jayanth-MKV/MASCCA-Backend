import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseProvider {
  private readonly supabase: SupabaseClient;

    constructor(configService: ConfigService) {
        const SUPABASE_URL = configService.get('SUPABASE_URL');
        const SUPABASE_KEY = configService.get('SUPABASE_KEY');

      this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async getClient(): Promise<SupabaseClient> {
      return this.supabase;
  }
}
