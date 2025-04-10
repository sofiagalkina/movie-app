export async function GET(request, context) {
    const { id } = context.params;

    const API_TOKEN = "bb68c74b-a4bf-4078-97d8-c19227709b51";

    try {
        const apiUrl = `https://www.myapimovies.com/api/v1/name/${id}?token=${API_TOKEN}`;
        console.log("Fetching:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error("External API error:", response.status, response.statusText);
            return new Response("Failed to fetch actor data", { status: response.status });
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Internal fetch error:", error);
        return new Response("Server error", { status: 500 });
    }
}
