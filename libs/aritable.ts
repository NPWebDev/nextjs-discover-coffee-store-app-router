import { AirtableRecordType, CoffeeStoreType } from "@/types";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "applQcRR7YLidUjf4"
);

const table = base("coffee-stores");

const getMinifiedRecords = (records: Array<AirtableRecordType>) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

export const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

export const createCoffeeStore = async (
  coffeeStore: CoffeeStoreType,
  id: string
) => {
  const { name, address, voting = 0, imgUrl } = coffeeStore;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              voting,
              imgUrl,
            },
          },
        ]);

        if (createRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(createRecords);
        }
      } else {
        console.log("Coffee store exists", id);
        return records;
      }
    } else {
      console.log("Store id is missing");
    }
  } catch (error) {
    console.error("Error while creating store", error);
  }
};
