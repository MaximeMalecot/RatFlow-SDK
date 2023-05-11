# Ressources utilisables pour le développement du projet

front : 
    Gestion IDVisiteur -> instancié une fois
    Gestion IDVisite -> instancié à chaque nouvelle instance de l'app et supprimé lors du départ ou dépassement de l'iddle time
    CB de handling custom -> a mettre dans les EventListener, pour faire un traitement sur la donnée avant de l'envoyer grâce au fetchEvent
    On envoie : ID Visiteur, ID Visite, Event, PagePosition


Librairie pur l'étude comportemental : https://www.npmjs.com/package/@fingerprintjs/fingerprintjs
Librairie de cartes de chaleurs : https://www.npmjs.com/package/heatmapjs

Techno thread front :
    webworker -> calcul
    serviceworker

Batching : on catch toutes les requêtes pour en envoyer qu'une seule contenant tous les données passées tous les x Temps


Le SDK mettra a disposition une fonction d'envoi front ET back


https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API Pour l'envoie de requête non-bloquantes


Fonctionnalités :
    BACK-OFFICE : Dashboard (edit/view), Sécu (auth/register), Tags (CRU), Tunnel (Data qui est une suite chronologique de tags. CR), route de POST des data analytics
    SDK : structure :
        /lib
        /react
        /node
    Tous le monde va utiliser lib 

## Attendus Front : 

init : init(configOptions)
    configOptions : {
        app_id: string required,
        service?: string, (default: null, ex: "frontend")n
        beacon?: boolean (default: true),
        serviceWorker?: boolean (default: true),
    }
init va : 
    générer / récupérer ça :
        clientId: string required,
        sessionId: string required,
    vérifier ça : 
        appId: string required,
        appSecret: string required,

eventData: {
    appId: string required,
    appSecret?: string required,
    service?: string, (default: null, ex: "frontend")


    
    tag?: string,
    clientId: string required,
    sessionId: string required,
    event: string required,
    url: string required,
    userAgent: string required,
    customData?: object,
    date: Date required,
}


## Attendus Back :

SDK back :
    Collecter les données par les requêtes 
    middleware de récupération de données sur les requetes
    fonctions d'envoie de données


SDK BACK CORRECTION :
    données back : IP, adresse MAC, userAgent, Referer
    Envoie de custom-event
    L'utilisateur fournit le sessionId et clientId 
    Middleware de collecte de données et d'envoi

    app.use(tracker({
        appId:
        appSecret:
        service:
    }))


    function tracker({appId,appSecret,service="null"}){
        const secretData = {
            appId,
            appSecret
        };

        return function trackerMiddleware(req,res,next){
            const userData = {
                ip: req.ip,
                url: req.url,
                method: req.method,
                userAgent: req.headers["user-agent"],
                <!-- ID Visitor,
                ID Session -->
            }

            req.sendTrackerEvent = function(...event){
                sendEvent({
                    ...event,
                    ...userData,
                });
            }

            next();
        }
    }

    sendEvent = (data, secretData) => {
        const url = zaokezakoezae;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Basic '+ Buffer.from(`${secretData.appId}:${secretData.appSecret}`).toString("base64")
            }
        })
    }

    collecte des UserAgents : UAParse.js
    Logging : Winston, Morgan

    SendEvent doit être envoyé après que la réponse du serveur client ait été envoyée (cf : https://github.com/expressjs/morgan/blob/master/index.js ligne 100)
    Ou alors utilisé les "WorkerThread"
