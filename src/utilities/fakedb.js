// use local storage as your db for now
const addToDb = id => {
  
  const exists = getDb();
  let loggedIn = id;
  
  //console.log(loggedIn);
  updateDb(loggedIn);
}

const getDb = () => localStorage.getItem('loggedIn');

const updateDb = loggedIn => {
  localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
}

const removeFromDb = id => {
  const exists = getDb();
  if (!exists) {

  }
  else {
    const loggedIn = JSON.parse(exists);
    delete loggedIn[id];
    updateDb(loggedIn);
  }
}

const getLoggedIn = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
}

const clearLoggedIn = () => {
  localStorage.removeItem('loggedIn');
}

export { addToDb, removeFromDb as deleteFromDb, clearLoggedIn, getLoggedIn }