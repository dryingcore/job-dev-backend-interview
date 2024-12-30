import Server from '@/server/Server';
import { getDummyRoute } from '@/routes/dummyRoute';

const app = new Server(8080);

app.addRoute('/', getDummyRoute);

app.start();
