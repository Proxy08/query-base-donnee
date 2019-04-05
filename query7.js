 db.getCollection("Analyse-commune")
.aggregate([  

{$group:{_id: "$DEP", 
capaciteH: {$sum: "$Capacité Hotel"},
hotel: {$sum: "$Nb Hotel"}, 
camping: {$sum: "$Nb Camping"},
capaciteC: {$sum: "$Capacité Camping"},

            
         }}
    
 {
    $lookup:
    {
        from: "commune",
        localField: "_id",
        foreignField : "code_departement",
        as: "commune_an"
    }   
    
},
  { $unwind: "$commune_an"}
    {$project: {
        Departement:'$commune_an.departement',
        hotel:1,
        capaciteH:1,
      camping:1,
      capaciteC:1,

      
     // Disponible:{}
    }}
{$group:{_id: "$Departement", 
           hotel: {$avg: "$hotel"},
            'hotel Capacite': {$avg: "$capaciteH"},
            Camping: {$avg: "$camping"},
            'camping Capacite': {$avg: "$capaciteC"},
            
            
         }}
             {$project: {
                 _id:0,
                  Departement:'$_id',
          hotel:1,
      'hotel Capacite':1,
      Camping:1,
      'camping Capacite':1,

    }}

    ])