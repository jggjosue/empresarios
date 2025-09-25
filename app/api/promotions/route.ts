import { NextResponse } from 'next/server';

const BASE_URL = "https://api.awin.com/publisher";
const PUBLISHER_ID = '1533377';
const TOKEN = '282f55e0-d459-4e9e-817d-9cc3e456ae89';

export async function POST(request: Request) {
    try {
        // For this debugging step, we will send the simplest possible valid request body: an empty JSON object.
        // This will help determine if the issue is with the filters or with the authentication/endpoint itself.
        const requestBody = {};

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(`${BASE_URL}/${PUBLISHER_ID}/promotions`, requestOptions);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Awin API Error Body:", errorText);
            return NextResponse.json({ message: `Error from Awin API: ${response.statusText}`, details: errorText }, { status: response.status });
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);

    } catch (error) {
        console.error("Internal API Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
