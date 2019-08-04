type List = {
  q: string;
  sr: string;
  ds: string;
  start: number;
  end: number;
  total: number;
  group: string;
  sort: string;
  item: Item[];
};

type Item = {
  offset: number;
  group: string;
  name: string;
  ndbno: string;
  ds: string;
  manu: string;
};

export type SearchResponse = {
  list: List;
};

type DetailsResponse = {

}
