export async function apicall( url, data ) {
	const fetchOptions = {
		method: "PUT",
		headers: {
     /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,PUT, POST, OPTIONS",
        },
		body: data,
	};

	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();

}

export function datatojson(data,data2) {
	let obj={};
	obj.token=data;
	obj.name=data2;
	return JSON.stringify(obj);

}