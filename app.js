var app = require("express")()
var http = require("http").Server(app)
var io = require("socket.io")(http)

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
	console.log("Detectada una señal portadora de la Fuerza..")
	socket.on("disconnect", () => {
		console.log("Ha desaparecido una señal portadora de la Fuerza.")
	})
	socket.on("mensaje chat", (msg) => {
		io.emit("mensaje chat", msg)
		console.log("mensaje: " + msg)
	})
})


http.listen(3000, () => {
	console.log("Perturbación de la fuerza en el puerto 3000")	
})