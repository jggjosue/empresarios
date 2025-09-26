import { NextResponse } from 'next/server';

const BASE_URL = "https://api.awin.com/publisher";
const PUBLISHER_ID = '1533377';
const TOKEN = '282f55e0-d459-4e9e-817d-9cc3e456ae89';

export async function POST(request: Request) {
    try {
        const { regionCode } = await request.json();

        // Build the filters object strictly according to the documentation
        const filters: any = {
            membership: 'joined',
            status: 'active',
            type: 'promotion' // Corrected type as per documentation
        };

        // Only add regionCodes filter if a specific region is selected
        if (regionCode) {
            filters.regionCodes = [regionCode];
        }

        const parameters = {
            filters: filters
            // Removed pagination to use API defaults and prevent errors
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(parameters)
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
