//Q40: Use for-loop to console log square numbers from 1 to 10.
// for (let i = 1; i < 10; i++) {
//     for (let j = 1; j < 10; j++) {
//         if(j**2 === i) {
//             console.log(i);
//         }
//     }
// }

//Q41: Write a function with input (argument) is an array, output (return) is one element from input with age is 21. Test with above array.
const data = [
  {
    id: 1,
    name: "A",
    age: 20,
  },
  {
    id: 2,
    name: "B",
    age: 21,
  },
  {
    id: 3,
    name: "C",
    age: 22,
  },
];


const data21 = data.filter((i) => {
    return i.age === 21;
});
console.log(data21[0]);

//Q42: Write a function with input (argument) is an array, 
//converts this array into json format and saves to db.json file. 
//Test with above array.
// const JSONdata = data.forEach((x) => {

// });
// const fs = require

// function JSONdata() {

// }


userController.updateInfoHandler = (req, res, next) => {
  console.log("finding student by id and updating info");

  try {
    // find the student with this id
    const result = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(result);
    let getData = data.filter(value => { return value.id === req.params.id });

    // making new name and age according to req.body content
    const newName = req.body.name;
    getData[0].name = newName;
    const newAge = req.body.age;
    getData[0].age = newAge;

    // read old database db.json
    const JSONcurrent = fs.readFileSync('db.json', 'utf8');
    let current = JSON.parse(JSONcurrent);

    // find id match in current db.json and replace with new info, while keeping the same index
    const getMatchIndex = current.findIndex((x) => {
      return x.id === req.params.id;
    });
    let updateContent = getData[0];
    let newContent = current.splice(getMatchIndex, 1, updateContent);
    
    // write into db2.json
    let JSONcontent = JSON.stringify(current);
    fs.writeFileSync('db2.json', JSONcontent);
    const jsonFile = fs.readFileSync('db2.json', 'utf8');
    const newResult = JSON.parse(jsonFile);
    return res.status(200).send({ current });
  } catch (error) {
    return next(error);
  }

};