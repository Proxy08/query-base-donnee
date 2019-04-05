 db.getCollection("Analyse-commune")
.aggregate([  
//     {$group:
    
 //{_id: { 'ID':'$CODGEO' , 'Logement': '$Nb Logement','Nb Log Vacants': '$Nb Log Vacants', difference:{$subtract: [{$toInt: "$Nb Logement"}, {$toInt: "$Nb Log Vacants"}]}}}
        
//     }
{$group:{_id: "$DEP", Disponible: {$avg: "$Disponible"},
           Logement: {$avg: "$Nb Logement"},
            Vacants: {$avg: "$Nb Log Vacants"}
            
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
      Logement:1,
      Vacants:1,
      
     // Disponible:{}
    }}
{$group:{_id: "$Departement", 
           Logement: {$avg: "$Logement"},
            Vacants: {$avg: "$Vacants"}
            
         }}
             {$project: {
                 _id:0,
                  Departement:'$_id',
      Logement:1,
      Vacants:1,
     Utiliser:{$subtract: [{$toInt: "$Logement"}, {$toInt: "$Vacants"}]}
    }}

    ])
