export type MapboxType = {
  id: string;
  text: string;
  properties: {
    address: string;
  };
};

export type CoffeeStoreType = {
  id: string;
  name: string;
  imgUrl: string;
  address: string;
  voting: number;
};

export type AirtableRecordType = {
  id: string;
  recordId: string;
  fields: CoffeeStoreType;
};
