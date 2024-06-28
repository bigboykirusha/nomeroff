export interface IPlateInfo {
   letters: string;
   numbers: string;
   regionCode: string;
}

export interface IItem {
   id: number;
   plateInfo: IPlateInfo;
   city: string;
   price: number;
   date: string;
   popularity: number;
}

export interface IFilters {
   sortBy: string;
   page: number;
   limit: number;
   filterOptions: {
      sameLetters: boolean;
      sameNumbers: boolean;
      mirrorNumbers: boolean;
      firstTen: boolean;
   };
}