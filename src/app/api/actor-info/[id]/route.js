// src/app/api/actor-info/[id]/route.js

import axios from 'axios';

const API_TOKEN = "bb68c74b-a4bf-4078-97d8-c19227709b51";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const response = await axios.get(`https://www.myapimovies.com/imdb/${id}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response('Error fetching data', { status: 500 });
    }
}
