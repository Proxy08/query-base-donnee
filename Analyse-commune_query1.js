 db.getCollection("Analyse-commune")
.aggregate([  
//     {$group:
    
 //{_id: { 'ID':'$CODGEO' , 'Logement': '$Nb Logement','Nb Log Vacants': '$Nb Log Vacants', difference:{$subtract: [{$toInt: "$Nb Logement"}, {$toInt: "$Nb Log Vacants"}]}}}
        
//     }
{$group:{_id: "$DEP",
instit: {$avg: "$Nb institution de Education, santé, action sociale, administration"},
           services_person: {$avg: "$Nb Services personnels et domestiques"},
            action: {$avg: "$Nb Education, santé, action sociale"},
             services_parti: {$avg: "$Nb de Services aux particuliers"}
            
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
      instit:1,
      services_person:1,
      action:1,
      services_parti:1
      
     // Disponible:{}
    }}
{$group:{_id: "$Departement", 
           instit: {$avg: "$instit"},
            services_person: {$avg: "$services_person"},
            action:{$avg:"$action"},
            services_parti:{$avg:"$services_parti"}
            
         }}
             {$project: {
                 _id:0,
                  Departement:'$_id',
      instit:1,
      services_person:1,
      action:1,
      services_parti:1
    // Utiliser:{$subtract: [{$toInt: "$Logement"}, {$toInt: "$Vacants"}]}
    }}

    ])