import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ixeeledgwublgaqrzlnf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZWVsZWRnd3VibGdhcXJ6bG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzU2NjAsImV4cCI6MjEwNjY1MTY2MH0.BFMVnziNQYGvuZx-iKODTKwVOO5_kNJNV7BqrZ7-5Fw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
