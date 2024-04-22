const myFunction = () => {
  const winScroll = window.scrollY;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = `${scrolled}%`;
};

window.onscroll = myFunction;


const getData = async () => {
  const url = "https://kjthaoo.github.io/projects/final/data.json";

  try {
      const response = await fetch(url);
      return await response.json();
  } catch (error) {
      console.log(error);
      return null; 
  }
};

const showData = async () => {
  let projects = await getData();
  if (!projects) return; 

  //console.log("Projects:", projects);
  let projectsSection = document.getElementById("projects");

  projects.sections.forEach((project) => { 
      projectsSection.appendChild(createProjectElement(project));
  });
};

const createProjectElement = (project) => {
  let section = document.createElement("div");
  section.classList.add("project-section");

  let box = document.createElement("div");
  box.classList.add("box");
  section.appendChild(box);

  let card = document.createElement("section");
  card.classList.add("card");
  box.appendChild(card);

  let image = document.createElement("img");
  image.src = "images/" + project.img_name;
  image.alt = project.title;
  image.classList.add("project-image");
  card.appendChild(image);

  let title = document.createElement("h3");
  let titleLink = document.createElement("a");
  titleLink.href = project.link;
  titleLink.textContent = project.title;
  title.appendChild(titleLink);
  box.appendChild(title);

  let description = document.createElement("p");
  description.textContent = project.description;
  description.classList.add("project-description");
  box.appendChild(description);

  let hr = document.createElement("hr");
  box.appendChild(hr);

  return section;
};

window.onload = () => showData();
