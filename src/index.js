class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json();
  };

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    console.log(res)
    return res.results;
  };

  getPerson(id) {
    return this.getResource(`/people/${id}`);
  };

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    console.log(res)
    return res.results;
  };

  getPlanet(id) {
    return this.getResource(`/planets/${id}`);
  };

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    console.log(res)
    return res.results;
  };

  getStarship(id) {
    return this.getResource(`/starships/${id}`);
  };
};

const swapi = new SwapiService();

swapi.getPerson(3).then((p) => console.log(p.name))