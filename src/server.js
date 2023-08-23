// import the express package(node_modules폴더 내에 존재하는 express를 npm이 import해줌)
import express from "express";

// port를 사용하는 이유 : 서버는 컴퓨터 전체를 listening할 수 없기 때문에 port가 있어야함
// port는 나의 컴퓨터로의 창문?문? 같은 것
// 컴퓨터에는 많은 port들이 있는데, 다수가 개방되어 있고, 많은 프로그램들이 그 안에서 소통하고 있음
// port번호는 어떠한 번호를 써도 상관은 없지만, 4000을 쓰는 게 백엔드 관습이고, 4000번은 거의 항상 비어있음.
const PORT = 4000;

// Make to express application
// express()함수를 호출하므로 인해서 express application을 바로 사용할 수 있게 return해줌
const app = express(); // const applicationName = expressFunction();

// 클라이언트의 행동을 listening하고 있는 서버에만 request를 보내는 것이 가능

const logger = (req, res, next) => {
	console.log(`${req.path} ${req.method} ${req.url}`);
	next();
};

const privateMiddleware = (req, res, next) => {
	// url을 체크하는 구문이 추가됨
	const url = req.url;
	// if문이 참이면 if문내의 값이 반환되고,
	if (url === "/protected") {
		return res.send("<h1>Not Allowed</h1>");
	}
	console.log("Allow");
	// if문이 거짓이면 next()인수를 통해 다음 함수를 호출
	next();
};

const handleHome = (req, res) => {
	return res.send("I send you");
};

const handleProtected = (req, res) => {
	return res.send("Welcome!!!");
};

// Global Middleware
app.use(logger);
app.use(privateMiddleware);

// request를 전달하려면 url을 사용해야 함
// app.get("route", handler(=controller)); handler는 그냥 함수임
// controller자리에는 함수가 와야함. 함수가 오지 않으면 Error.
app.get("/", handleHome);
app.get("/protected", handleProtected);

// handleListening함수 : 이 함수는 listening이 시작되면 호출되는 함수
const handleListening = () =>
	console.log(`Server listening on port http://localhost:${PORT}`);

// 현재 이 application에서는 해당port(즉, port=4000)만 listening하고 있음.
// listening한다는 의미는 해당port(즉, 문 창문)을 여는 것과 같다고 생각하면 됨
app.listen(PORT, handleListening);
