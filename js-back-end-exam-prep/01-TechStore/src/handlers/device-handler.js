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
        const device = await Device.findById(deviceId);

        if (device.owner.equals(userId)) {
            throw new Error('Cannot prefer your own device!');
        }

        if (device.preferredList.includes(userId)) {
            throw new Error('You already preferred this device!');
        }

        // device.preferredList.push(userId);
        // return device.save();
        return Device.findByIdAndUpdate(deviceId, { preferredList: userId });
    },
    delete(deviceId) {
        return Device.findByIdAndDelete(deviceId);
    },
    updateDevice(deviceId, deviceData) {
        return Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });
    },
};
