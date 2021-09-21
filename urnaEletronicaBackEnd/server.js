"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
var porta = 3001;
app.listen(porta, function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Server rodando na porta " + porta);
            return [2 /*return*/];
        });
    });
});
app.get("/candidatos", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var candidatos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lerArquivo("candidatos", ".csv", ",", "")];
                case 1:
                    candidatos = _a.sent();
                    response.send(candidatos);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/votoIndefinido", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var indefinidos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lerArquivo("votoIndefinido", ".csv", ",", "")];
                case 1:
                    indefinidos = _a.sent();
                    response.send(indefinidos);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/tipoDeVotacao", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var resposta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lerArquivo("config", ".csv", ",", "")];
                case 1:
                    resposta = _a.sent();
                    response.send(resposta);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/voto", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var rg, nome, numeroCandidato, data, voto, resposta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rg = request.body.rg;
                    nome = request.body.nome;
                    numeroCandidato = request.body.numeroCandidato;
                    data = new Date();
                    voto = rg + "," + nome + "," + numeroCandidato + "," + data + "\r\n";
                    return [4 /*yield*/, guardarRegistro("votos", ".csv", voto)];
                case 1:
                    resposta = _a.sent();
                    response.send(resposta);
                    return [2 /*return*/];
            }
        });
    });
});
function guardarRegistro(arquivo, extensao, voto, endereco) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (endereco == undefined)
                endereco = "";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.appendFile(endereco + arquivo + extensao, voto, function (err) {
                        if (err) {
                            reject({
                                "status": "500",
                                "mensagem": "Erro ao guardar registro no arquivo " + arquivo + ": " + err
                            });
                        }
                        else {
                            resolve({
                                "status": "200",
                                "mensagem": "Registrado com sucesso no arquivo " + arquivo
                            });
                        }
                    });
                })];
        });
    });
}
function lerArquivo(arquivo, extensao, separador, endereco) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (endereco == undefined)
                endereco = "";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.readFile(endereco + arquivo + extensao, "utf-8", function (err, data) {
                        if (err) {
                            reject("Erro ao ler arquivo: " + arquivo + extensao + " " + err);
                        }
                        else {
                            var vetorInicial = data.split("\r\n");
                            var vetorFormatado_1 = [];
                            vetorInicial.forEach(function (element) {
                                vetorFormatado_1.push(element.split(separador));
                            });
                            resolve(vetorFormatado_1);
                        }
                    });
                })];
        });
    });
}
