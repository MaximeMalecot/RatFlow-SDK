front : 
    Gestion IDVisiteur -> instancié une fois
    Gestion IDVisite -> instancié à chaque nouvelle instance de l'app et supprimé lors du départ ou dépassement de l'iddle time
    CB de handling custom -> a mettre dans les EventListener, pour faire un traitement sur la donnée avant de l'envoyer grâce au fetchEvent
    On envoie : ID Visiteur, ID Visite, Event, PagePosition



Librairie pour l'étude comportemental : https://www.npmjs.com/package/@fingerprintjs/fingerprintjs
Librairie de cartes de chaleurs : https://www.npmjs.com/package/heatmapjs
