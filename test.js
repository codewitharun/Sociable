// // const users = [
// //   {firstName: 'Salman', lastName: 'Khan', age: 55},
// //   {firstName: 'Riya', lastName: 'Rajput', age: 34},
// //   {firstName: 'Simran', lastName: 'Kapoor', age: 27},
// // ];

// // const newUser = users.reduce((accumulator, currentIteration) => {
// //   if (currentIteration.age > 27) {
// //     accumulator.push(
// //       currentIteration.firstName + ' ' + currentIteration.lastName,
// //     );
// //   }
// //   return accumulator;
// // }, []);
// // console.log('answer=', newUser);

// const users = [
//   {firstName: 'Akshay', lastName: 'Khurana', age: 27, gender: 'male'},
//   {firstName: 'Salman', lastName: 'Khan', age: 55, gender: 'male'},
//   {firstName: 'Riya', lastName: 'Rajput', age: 34, gender: 'female'},
//   {firstName: 'Simran', lastName: 'Kapoor', age: 27, gender: 'female'},
// ];
// const ad= users•filter ((item) => {
// if (item.firstName=="Salman"return item;
// item.firstName
// H)
// .map((e)
// => f
// return { fullName: e.firstName
// 3):
// •lastName, age: e.age };
// console.log(ab);

// memoised cube function
//promise function using setTimeout
// const awaitTimeout = delay =>
//   new Promise(resolve => setTimeout(resolve, delay));

// awaitTimeout(300).then(() => console.log('Hi'));

// const f = async () => {
//   await awaitTimeout(300);
//   console.log('Hi'); // Logs 'Hi' after 300ms
// };

// function fetchData() {
//   const fetchData = fetch('https://restcountries.com/v2/alpha/india')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => {
//       console.log(error);
//     });
// }
// fetchData();

fetch('https://restcountries.com/vremoj/name/india')
  .then(response => {
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  })
  .then(responseJson => {
    console.log(responseJson);
  })
  .catch(error => {
    console.log(error);
  });
