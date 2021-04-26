export default class ApiService {
    _apiBase = '/api/';
    async getResource(url) {
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
        res.forEach(val => {
          if (val.value === 'income') {
            income.push(val)
          } else {
            expenses.push(val)
          }
        });
        return [income, expenses];
      }

      async getBudget() {
        const res = await this.getResource(`/budget/`);
        return this.budgetIterationStatement(res);
      };

      async getBudgetByValue(...args) {
        const [value] = args;
        const res = await this.getResource(`/budget/${value}`);
        return res;
      };
};