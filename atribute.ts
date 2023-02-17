import { forEachSeries } from "p-iteration";

const AtributeNaimen = {
    firstName: "firstName",
    lastName: "lastName",
    street: "address.street",
    city: "address.city",
    state: "address.state",
    zipCode: "address.zipCode",
    phoneNumber: "phoneNumber",
    ssn: "ssn",
    username: "username",
    password: "password",
  };

  const fillFormValues = {
    firstName: "Ivan",
    lastName: "Dzenev",
    street: "Mira st. 132-105",
    city: "Moscow",
    state: "RussiaMother",
    zipCode: "784632575",
    phoneNumber: "8-800-555-35-35",
    ssn: "784254927",
    username: "testability",
    password: "Limanv12",
  };  

const attributeNameValues = Object.values(AtributeNaimen); // переводим обьект в массив значений имен атрибутов
attributeNameValues.forEach(element => {
    console.log(element);
});
