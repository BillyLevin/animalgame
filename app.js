const id = 'c0322ff92d97afa2e7e18721b9ba09683a97f5f81de507544a5c8adbaa577d00';

function setImage(img, author, username, animal) {
  document.querySelector('.animal-img').src = img;
  document.querySelector('.attribution-author').textContent = author;
  document.querySelector('.attribution-author').href = `https://unsplash.com/@${username}?utm_source=animal_game&utm_medium=referral`;
  document.querySelector('.animal-name').textContent = animal;
  document.querySelector('.animal-info').href = `https://en.wikipedia.org/wiki/${animal}`;
}

function getImage(animal) {
  fetch(`https://api.unsplash.com/search/photos?client_id=${id}&query=${animal}`)
    .then(blob => blob.json())
    .then(data => {
      if (data.results.length === 0) {
        randomAnimal();
        return;
      }
      const username = data.results[0].user.username;
      const author = data.results[0].user.name;
      const link = data.results[0].urls.raw;
      setImage(link, author, username, animal);
    })
    .catch(err => console.log(err));
}

function randomAnimal() {
  let animal;
  fetch('animals.json')
    .then(res => res.json())
    .then(animals => {
      animal = animals[Math.floor(Math.random()*animals.length)];
      getImage(animal);
    })
}

function generateAnimal() {
  document.querySelector('.animal-card').style.display = 'none';
  document.querySelector('.paws').style.display = 'block';
  randomAnimal();
  setTimeout(() => {
    document.querySelector('.paws').style.display = 'none';
    document.querySelector('.animal-card').style.display = 'flex';
  }, 2500);
}

document.querySelector('.generate-btn').addEventListener('click', generateAnimal);
