import 'dotenv/config';
import App from './app';
import 'module-alias/register';
import UserController from '@/resources/user/user.controller';
import BudgetController from '@/resources/budget/budget.controller';

const app = new App(
    [new BudgetController(), new UserController()],
    Number(process.env.PORT)
);

app.listen();
