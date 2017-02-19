var elements = [];
axios.get('https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json')
  .then(function (response) {
    console.log(response);
    elements = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
