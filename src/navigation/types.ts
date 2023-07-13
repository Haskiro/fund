export type RootStackParams = {
    Profile: undefined;
    // Home: undefined;
    Places: PlaceStackParams;
    MapStack: MapStackParams
};

export type PlaceStackParams = {
    PlaceList: undefined;
    PlaceItem: {
        id: string;
    };
};

export type MapStackParams = {
    Map: undefined;
    PlaceItem: {
        id: string
    }
};

