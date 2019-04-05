 db.getCollection("Analyse-commune")
.aggregate([  
//     {$group:
    
 //{_id: { 'ID':'$CODGEO' , 'Logement': '$Nb Logement','Nb Log Vacants': '$Nb Log Vacants', difference:{$subtract: [{$toInt: "$Nb Logement"}, {$toInt: "$Nb Log Vacants"}]}}}
        
//     }
{$group:{_id: "$DEP",
atifs: {$avg: "$Nb Atifs"},
           salarie: {$avg: "$Nb Actifs Salariés"},
            nonSalarie: {$avg: "$Nb Actifs Non Salariés"}
            
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
      atifs:1,
      salarie:1,
      nonSalarie:1
      
     // Disponible:{}
    }}
{$group:{_id: "$Departement", 
           atifs: {$avg: "$atifs"},
            salarie: {$avg: "$salarie"},
            chomeurs:{$avg:"$nonSalarie"}
            
         }}
             {$project: {
                 _id:0,
                  Departement:'$_id',
      atifs:1,
      salarie:1,
      chomeurs:1
    // Utiliser:{$subtract: [{$toInt: "$Logement"}, {$toInt: "$Vacants"}]}
    }}

    ])