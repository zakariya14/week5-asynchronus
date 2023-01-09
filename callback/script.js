// function getData(url, success, error) {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         success(xhr.response);
//       } else if (xhr.status === 404) {
//         error();
//       }
//     }
//   };

//   xhr.open("GET", url);
//   xhr.send();
// }

// getData(
//   "https://jsonplaceholder.typicode.com/users",
//   (results) => {
//     const dataJSON = JSON.parse(results);
//     dataJSON.forEach((d) => {
//       console.log(dataJSON);
//     });
//   },
//   () => {}
// );

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(xhr.responseText);
    data.forEach((d) => {
      console.log(data);
      document.getElementById("table").innerHTML += `<tbody>
        <tr>
            <td>${d.id}</td>
            <td>${d.name}</td>
            <td>${d.username}</td>
            <td>${d.email}</td>
            <td>${d.address.street}, ${d.address.suite}, ${d.address.city}</td>
            <td>${d.company.name}</td>
        </tr>
      </tbody>`;
    });
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
xhr.send();
