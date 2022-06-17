"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const initializing_1 = require("../classes/initializing");
const router = (0, express_1.Router)();
router.get('/gglmapa', (req, res) => {
    res.json(initializing_1.gglmapa.getMarcadores());
});
router.get('/grafica', (req, res) => {
    res.json(initializing_1.grafica.getDataGrafica());
});
router.post('/grafica', (req, res) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);
    initializing_1.grafica.incrementarValor(mes, unidades);
    const server = server_1.default.instance;
    server.io.emit('cambio-grafica', initializing_1.grafica.getDataGrafica());
    res.json(initializing_1.grafica.getDataGrafica());
});
router.get('/encuesta', (req, res) => {
    res.json(initializing_1.encuesta.getDataGrafica());
    console.log(initializing_1.encuesta.getDataGrafica());
});
router.post('/encuesta', (req, res) => {
    const e_option = Number(req.body.e_option);
    const quantity = Number(req.body.unvalue);
    console.log(`${e_option} ${quantity}`);
    initializing_1.encuesta.incrementarValor(e_option, quantity);
    const server = server_1.default.instance;
    server.io.emit('cambio-encuesta', initializing_1.encuesta.getDataGrafica());
    res.json(initializing_1.encuesta.getDataGrafica());
});
router.get('/mapa', (req, res) => {
    res.json(initializing_1.mapa.getMarcadores());
});
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        message: 'Todo está bien.'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = { cuerpo, de };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.allSockets().then((clientes) => {
        res.json({
            ok: true,
            clientes: Array.from(clientes)
        });
    }).catch((e) => {
        res.json({
            ok: false,
            e
        });
    });
});
router.get('/usuarios/detalle', (req, res) => {
    console.log(initializing_1.usuariosConectados.getLista());
    res.json({
        ok: true,
        clientes: initializing_1.usuariosConectados.getLista()
    });
});
router.get('/mesas-activas', (req, res) => {
    res.json({
        ok: true,
        mesas: initializing_1.usuariosTicket.getMesas()
    });
});
router.get('/tickets_activos', (req, res) => {
    res.json({
        ok: true,
        tickets: initializing_1.usuariosTicket.getTickets()
    });
});
router.get('/mesas/detalle', (req, res) => {
    console.log(initializing_1.usuariosTicket.getMesas());
    res.json({
        ok: true,
        clientes: initializing_1.usuariosTicket.getMesas()
    });
});
router.get('/last_five', (req, res) => {
    res.json({
        ok: true,
        tickets: initializing_1.usuariosTicket.getLastFive()
    });
});
router.get('/rooms', (req, res) => {
    res.json({
        ok: true,
        salas: initializing_1.salas.all_rooms()
    });
});
exports.default = router;
