//@ts-nocheck
const sessionHelper = {
  getRecord: (id: string) => {
    let json = sessionStorage.getItem('records');
    let records = [];
    let record = [];

    if (json) {
      records = JSON.parse(json);
      record = records.filter((x) => x.id === id);
      return record[0] ?? {};
    }

    return {};
  },

  setRecord: (data) => {
    let records = [];
    let duplicateRecords = [];
    let json = sessionStorage.getItem('records');

    if (json) {
      records = JSON.parse(json);
      duplicateRecords = records.filter((x) => x.id === data.id);
    }

    if (duplicateRecords.length === 0) {
      records.push(data);
    } else {
      records = records.map((x, i) => (x.id === data.id ? data : x));
    }

    if (records.length > 10) {
      records.shift();
    }

    sessionStorage.setItem('records', JSON.stringify(records));
  }
};

export default sessionHelper;
