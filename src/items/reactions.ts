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

export enum SourceNotes {
  OnlyObtainableOnHalloween = 'Only obtainable on Halloween',
  RequiresAHighLevelOfFriendship = 'Requires a high level of friendship',
}

export enum SourceSheet {
  Reactions = 'Reactions',
}

export enum VersionAdded {
  The100 = '1.0.0',
  The150 = '1.5.0',
}
