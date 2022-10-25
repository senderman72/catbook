const getCats = async function () {
  const response = await fetch("http://localhost:3000");
  const data = await response.json();
  console.log(data);
};

getCats();
