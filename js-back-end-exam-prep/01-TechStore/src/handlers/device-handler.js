import Device from '../models/Device.js';

export default {
    async getAllDevices(filter = {}) {
        return Device.find({});
    },
    async createDevice(deviceData, ownerId) {
        const promise = Device.create({
            ...deviceData,
            price: Number(deviceData.price),
            owner: ownerId,
        });

        return promise;
    },
};
