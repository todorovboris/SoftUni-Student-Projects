const baseUrl = 'http://localhost:3030/data/solutions';

export async function getAll() {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
    const solutions = await response.json();

    return solutions;
}

export async function getOne(solutionId) {
    const response = await fetch(`${baseUrl}/${solutionId}`);
    const solution = await response.json();

    return solution;
}

export async function createSolution(solutionData) {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(solutionData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    return data;
}

export async function editSolution(solutionId, data) {
    const response = await fetch(`${baseUrl}/${solutionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data),
    });

    const solutionData = await response.json();
    return solutionData;
}

export async function deleteSolution(solutionId) {
    const response = await fetch(`${baseUrl}/${solutionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
    });

    const solutionData = await response.json();
    return solutionData;
}
