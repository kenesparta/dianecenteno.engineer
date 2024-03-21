function convertDateRange(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr.split('-').reverse().join('-'));
  const endDate = new Date(endDateStr.split('-').reverse().join('-'));

  const monthOptions = { month: 'short' };

  const startMonth = new Intl.DateTimeFormat('es-ES', monthOptions).format(startDate);
  const endMonth = new Intl.DateTimeFormat('es-ES', monthOptions).format(endDate);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const year = endDate.getFullYear();
  if (startMonth === endMonth) {
    return `${capitalize(startMonth)} ${year}`;
  }
  return `${capitalize(startMonth)} - ${capitalize(endMonth)} ${year}`;
}


function appendExperiences(experiences) {
  const container = document.querySelector('#my-experience');

  experiences.forEach(experience => {
    const { id, foto, cargo, descripcion, fecha_inicio, fecha_fin, institucion, region, provincia, distrito } = experience;

    const cardHTML = `
            <div class="col-sm-6 col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="${foto}" class="card-img-top" alt="Card Image" height="250px">
                    <div class="card-body">
                        <h5 class="__ds-card-title">${cargo}</h5>
                        <p class="__ds-card-sub-title">
                            <i class="bi bi-building"></i>
                            ${institucion}
                        </p>
                        <div class="card-text">
                            ${descripcion}
                        </div>
                    </div>
                    <div class="card-footer" style="background-color: rgba(35, 147, 69, 0.1)">
                        <small class="text-body-secondary"><i class="bi bi-calendar2-date-fill pe-1"></i>
                            ${convertDateRange(fecha_inicio, fecha_fin)}
                        </small>
                        <br>
                        <small class="text-body-secondary"><i class="bi bi-geo-alt-fill pe-1"></i>
                            ${distrito ? distrito + ' - ' : ''}${provincia} - ${region}
                        </small>
                    </div>
                </div>
            </div>`;

    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

function loadAndAppendExperiences() {
  fetch('data/data_cv.json')
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => b.id - a.id);
      appendExperiences(data);
    })
    .catch(error => console.error('Error loading the experiences data:', error));
}

function appendSkills(skills) {
  const container = document.querySelector('#my-skills');

  skills.forEach(s => {
    const { image } = s;
    const cardHTML = `
<div class="__ds_skills_grid_element">
  <img src="${image}" class="" alt="Card Image">
</div>`;

    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

function loadAndAppendSkills() {
  const skillsList = [
    {
      image: "./img/skills/Logo_AutoCad.png"
    },
    {
      image: "./img/skills/Logo_S10.png"
    },
    {
      image: "./img/skills/Logo_Delphin_Express.png"
    },
    {
      image: "./img/skills/Logo_ArcGis.png"
    },
    {
      image: "./img/skills/Logo_Google_Earth.png"
    },
    {
      image: "./img/skills/Logo_MapSource.png"
    },
    {
      image: "./img/skills/Logo_Google_Maps.png"
    },
    {
      image: "./img/skills/Logo_DJI_Drone.png"
    },
    {
      image: "./img/skills/Logo_Microsoft_Office.png"
    },
    {
      image: "./img/skills/Logo_Minitab.png"
    },
    // {
    //   image: "./img/skills/Logo_InfoStat.png"
    // },
  ]
  appendSkills(skillsList)
}

function setCurrentDate() {
  const container = document.querySelector('#current-date');
  container.insertAdjacentHTML('beforeend', `${new Date().getFullYear()}`);
}

loadAndAppendExperiences();
loadAndAppendSkills();
setCurrentDate();
