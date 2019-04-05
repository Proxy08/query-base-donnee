 db.getCollection("commune")
.aggregate([  
    
        {$group: {  _id:{Statut:'$Statut', Commune:'$Commune' }} },
