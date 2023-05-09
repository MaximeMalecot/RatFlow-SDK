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

## Attendus : 

init : init(configOptions)
    configOptions : {
        app_id: string required,
        app_secret: string required,
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
    appSecret: string required,
    tag?: string,
    clientId: string required,
    sessionId: string required,
    event: string required,
    url: string required,
    customData?: object,
    date: Date required,
}
