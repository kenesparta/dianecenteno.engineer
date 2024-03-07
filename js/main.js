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
            <div class="col-sm-6 col-md-4">
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

loadAndAppendExperiences();
