import Device from '../models/Device.js';

export default {
    getLatest() {
        return Device.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getAllDevices() {
        return Device.find({});
    },
    getOneDevice(deviceId) {
        return Device.findById(deviceId);
    },
    async createDevice(deviceData, ownerId) {
        const promise = Device.create({
            ...deviceData,
            price: Number(deviceData.price),
            owner: ownerId,
        });

        return promise;
    },
    async preferDevice(deviceId, userId) {
        // const promise = Device.findByIdAndUpdate(deviceId, {})
    },
};
