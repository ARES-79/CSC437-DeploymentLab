export async function sendPostRequest(url: string, payload: Record<string, unknown>) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        return response.json()
            .catch(() => null) // Handle cases where there's no JSON body
            .then(data => ({ status: response.status, body: data }));
    })
    .catch(error => {
        console.error(`Failed POST request to ${url}: ${error}`);
        throw error;
    });
}