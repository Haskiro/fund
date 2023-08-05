export type RootStackParams = {
    Profile: undefined;
    // Home: undefined;
    Places: PlaceStackParams;
    // MapStack: MapStackParams;
    // Cards: undefined;
};

export type PlaceStackParams = {
    PlaceList: undefined;
    PlaceItem: {
        id: string;
    };
    Map: {
        category: string
    };
};

export type MapStackParams = {
    Map: {
        category: string
    };
    PlaceItem: {
        id: string
    }
};

