export interface Recipes {
    sourceSheet: SourceSheet;
    name: string;
    image: string;
    buy: number;
    sell: number | null;
    exchangePrice: number | null;
    exchangeCurrency: ExchangeCurrency | null;
    source: string[];
    sourceNotes: null | string;
    versionAdded: VersionAdded;
    unlocked: boolean;
    unlockNotes: UnlockNotes | null;
    recipesToUnlock: number;
    category: Category;
    craftedItemInternalId: number;
    cardColor: CardColorEnum | number | null;
    diyIconFilename: string;
    serialId: number;
    internalId: number;
    uniqueEntryId: string;
    materials: {
        [key: string]: number;
    };
}
export declare enum CardColorEnum {
    Beige = "beige",
    Blue = "blue",
    Brick = "brick",
    Brown = "brown",
    DarkGray = "dark gray",
    Gold = "gold",
    Green = "green",
    LightGray = "light gray",
    Orange = "orange",
    Pink = "pink",
    Red = "red",
    Silver = "silver",
    White = "white",
    Yellow = "yellow"
}
export declare enum Category {
    Equipment = "Equipment",
    Floors = "Floors",
    Housewares = "Housewares",
    Miscellaneous = "Miscellaneous",
    Other = "Other",
    Rugs = "Rugs",
    Tools = "Tools",
    WallMounted = "Wall-mounted",
    Wallpaper = "Wallpaper"
}
export declare enum ExchangeCurrency {
    NookMiles = "Nook Miles"
}
export declare enum SourceSheet {
    Recipes = "Recipes"
}
export declare enum UnlockNotes {
    The20200401BCAT110A = "2020-04-01; BCAT; 1.1.0a",
    The20200601BCAT121C = "2020-06-01; BCAT; 1.2.1c"
}
export declare enum VersionAdded {
    The100 = "1.0.0",
    The110 = "1.1.0",
    The120 = "1.2.0",
    The130 = "1.3.0",
    The140 = "1.4.0",
    The150 = "1.5.0"
}
