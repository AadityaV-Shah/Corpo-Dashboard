import React, { useState, useEffect } from 'react';
import { supabaseApi } from '@/api/supabase';

export function useSupabaseFetch<T>(endpoint: string, params?: object) {

    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await supabaseApi.get(endpoint, { params });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

    return {data, loading, setData};
}