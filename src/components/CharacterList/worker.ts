export default async()=>{
  const response= await fetch("https://swapi.tech/api/people");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};