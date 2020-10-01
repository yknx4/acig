export interface Reactions {
    sourceSheet: SourceSheet;
    name: string;
    image: string;
    source: string[];
    sourceNotes: SourceNotes | null;
    versionAdded: VersionAdded;
    iconFilename: string;
    uniqueEntryId: string;
}
export declare enum SourceNotes {
    OnlyObtainableOnHalloween = "Only obtainable on Halloween",
    RequiresAHighLevelOfFriendship = "Requires a high level of friendship"
}
export declare enum SourceSheet {
    Reactions = "Reactions"
}
export declare enum VersionAdded {
    The100 = "1.0.0",
    The150 = "1.5.0"
}
