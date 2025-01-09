const baseUrl = 'http://localhost:3030/data/cars';

export async function getAll() {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
    const cars = await response.json();
    return cars;
}

export async function getOne(carId) {
    const response = await fetch(`${baseUrl}/${carId}`);
    const car = await response.json();
    return car;
}

export async function createCar(carData) {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(carData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const car = await response.json();
    return car;
}

export async function editCar(carId, carData) {
    const response = await fetch(`${baseUrl}/${carId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(carData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const editedCarData = await response.json();
    return editedCarData;
}

export async function deleteCar(carId) {
    const response = await fetch(`${baseUrl}/${carId}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': localStorage.getItem('accessToken') },
    });

    const data = await response.json();
    return data;
}
