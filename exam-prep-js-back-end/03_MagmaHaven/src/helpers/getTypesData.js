export default function getVolcanoTypesData(type) {
    const typesMap = {
        Supervolcanoes: 'Supervolcanoes',
        Submarine: 'Submarine',
        Subglacial: 'Subglacial',
        Mud: 'Mud',
        Stratovolcanoes: 'Stratovolcanoes',
        Shield: 'Shield',
    };

    const types = Object.keys(typesMap).map((value) => ({
        value,
        label: typesMap[value],
        selected: value === type ? 'selected' : '',
    }));

    return types;
}
