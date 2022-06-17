import { Router, Request, Response } from "express";
import { GraficaData } from "../classes/grafica";
import Server from "../classes/server";
import { EncuestaData } from "../classes/encuesta";
import { Mapa } from '../classes/mapa';
import { encuesta, gglmapa, grafica, mapa, usuariosConectados, usuariosTicket, salas } from '../classes/initializing';

const router = Router();




router.get('/gglmapa', (req: Request, res: Response) =>{
    res.json(gglmapa.getMarcadores());


});

router.get('/grafica', ( req: Request, res: Response  ) => {

    res.json( grafica.getDataGrafica() );

});

router.post('/grafica', ( req: Request, res: Response  ) => {

    const mes      = req.body.mes;
    const unidades = Number( req.body.unidades );

    grafica.incrementarValor( mes, unidades );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica() );


    res.json( grafica.getDataGrafica() );

});

router.get('/encuesta', ( req: Request, res: Response  ) => {
    res.json( encuesta.getDataGrafica() );
    console.log(encuesta.getDataGrafica());
});


router.post('/encuesta', ( req: Request, res: Response  ) => {

    const e_option      = Number( req.body.e_option );
    const quantity = Number( req.body.unvalue );

    console.log(`${e_option} ${quantity}`);
    encuesta.incrementarValor( e_option, quantity);

    const server = Server.instance;
    server.io.emit('cambio-encuesta', encuesta.getDataGrafica() );


    res.json( encuesta.getDataGrafica() );

});

router.get('/mapa', (req: Request, res:Response) =>{
    res.json(mapa.getMarcadores());
})

router.get('/mensajes',(req:Request, res:Response) =>{
    res.json({
        ok:true,
        message:'Todo está bien.'
    })
})

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const payload = { cuerpo, de };
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload );
    res.json({
        ok: true,
        cuerpo,
        de
    });

});



router.post('/mensajes/:id',(req:Request, res:Response) =>{


    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );


    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })

});


router.get('/usuarios', (req:Request, res:Response) => {

    const server = Server.instance;
    server.io.allSockets().then((clientes) => {
        res.json({
            ok:true,
            clientes: Array.from(clientes)
        });
    }).catch((e) =>{
        res.json({
            ok:false,
            e
        })
    })
})


router.get('/usuarios/detalle', (req:Request, res:Response) => { 

    console.log(usuariosConectados.getLista())
    res.json({
        ok:true,
        clientes:usuariosConectados.getLista()
    });

});


router.get('/mesas-activas', ( req: Request, res: Response  ) => {

    res.json({
        ok:true,
        mesas:usuariosTicket.getMesas()
    } );

});

router.get('/tickets_activos', ( req: Request, res: Response  ) => {

    res.json({
        ok:true,
        tickets:usuariosTicket.getTickets()
    } );

});

router.get('/mesas/detalle', (req:Request, res:Response) => { 

    console.log(usuariosTicket.getMesas())
    res.json({
        ok:true,
        clientes:usuariosTicket.getMesas()
    });

});

router.get('/last_five', (req: Request, res: Response  ) => {
    res.json({
        ok:true,
        tickets:usuariosTicket.getLastFive()
    } );
});

router.get('/rooms',(req: Request, res: Response  ) => {
    res.json({
        ok:true,
        salas:salas.all_rooms()
    } );
} )






export default router;
