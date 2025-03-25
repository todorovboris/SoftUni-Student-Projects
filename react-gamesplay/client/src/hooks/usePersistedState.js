import { useState } from 'react';

export default function usePersistedState(stateKey, initState) {
    const setStateFunction = () => {
        const persistedStateJson = localStorage.getItem(stateKey);

        if (!persistedStateJson) {
            return typeof initState === 'function' ? initState() : initState;
        }

        const persistedStateData = JSON.parse(persistedStateJson);

        return persistedStateData;
    };

    const [state, setState] = useState(setStateFunction);

    const setPersistedState = (input) => {
        const data = typeof input === 'function' ? input(state) : input;

        const persistedData = JSON.stringify(data);

        localStorage.setItem(stateKey, persistedData);

        setState(data);
    };

    return [state, setPersistedState];
}
