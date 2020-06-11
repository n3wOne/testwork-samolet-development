export function getData() {
  return fetch(
    "https://data.gov.ru/sites/default/files/opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json",
    {
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
    }
  ).then((response) => response.json());
}
