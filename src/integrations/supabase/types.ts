import { Database as DatabaseGenerated } from './generated-types';

export type { DatabaseGenerated as Database };

export type Tables<T extends keyof DatabaseGenerated['public']['Tables']> = DatabaseGenerated['public']['Tables'][T]['Row'];
export type Enums<T extends keyof DatabaseGenerated['public']['Enums']> = DatabaseGenerated['public']['Enums'][T];

export type TablesInsert<T extends keyof DatabaseGenerated['public']['Tables']> = DatabaseGenerated['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof DatabaseGenerated['public']['Tables']> = DatabaseGenerated['public']['Tables'][T]['Update'];