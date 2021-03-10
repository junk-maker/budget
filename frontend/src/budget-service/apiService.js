export default class ApiService {
    _apiBase = '/api/';
    async getResource(...args) {
      const [url] = args;
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return await res.json();
      };

      budgetIterationStatement(...args) {
        const income = [];
        const [res] = args;
        const expenses = [];
        res.forEach(value => {
          if (value.type) {
            income.push(value)
          } else {
            expenses.push(value)
          }
        });
        return [income, expenses];
      }

      async getBudget() {
        const res = await this.getResource(`/budget/`);
        return this.budgetIterationStatement(res);
      };

      
};