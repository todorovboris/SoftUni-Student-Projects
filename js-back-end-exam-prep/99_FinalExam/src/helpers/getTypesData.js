export default function getDisasterTypesData(type) {
    const typesMap = {
        Wildfire: 'Wildfire',
        Flood: 'Flood',
        Earthquake: 'Earthquake',
        Hurricane: 'Hurricane',
        Drought: 'Drought',
        Tsunami: 'Tsunami',
        Other: 'Other',
    };

    const types = Object.keys(typesMap).map((value) => ({
        value,
        label: typesMap[value],
        selected: value === type ? 'selected' : '',
    }));

    return types;
}
