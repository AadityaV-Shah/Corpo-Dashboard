import axios from 'axios';

const SUPABASE_URL = 'https://muursavayngywcmcwnch.supabase.co/rest/v1';
const ANON_KEY = 'sb_publishable_OSykmjYZK5du7P-FlY6emQ_3ClSrbdU';

export const supabaseApi = axios.create({
    baseURL: SUPABASE_URL,
    headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation' // This makes Supabase return the updated row
    },
})