 db.getCollection("Analyse-commune")
.aggregate([  
//     {$group:
    
 //{_id: { 'ID':'$CODGEO' , 'Logement': '$Nb Logement','Nb Log Vacants': '$Nb Log Vacants', difference:{$subtract: [{$toInt: "$Nb Logement"}, {$toInt: "$Nb Log Vacants"}]}}}
        
//     }
{$group:{_id: "$Orientation Economique",
id:{ $addToSet: "$CODGEO"} 
            
         }}

    
 {
    $lookup:
    {
        from: "commune",
        localField: "id",
        foreignField : "code_insee",
        as: "commune_an"
    }   
    
},
  { $unwind: "$commune_an"}
  
               
          
  
  
    // {$project: {
    //     Departement:'$commune_an.c',
    //   instit:1,
    //   services_person:1,
    //   action:1,
    //   services_parti:1
      
    //  // Disponible:{}
    // }}
// {$group:{_id: "$Departement", 
//           instit: {$avg: "$instit"},
//             services_person: {$avg: "$services_person"},
//             action:{$avg:"$action"},
//             services_parti:{$avg:"$services_parti"}
            
//          }}
//              {$project: {
//                  _id:0,
//                   Departement:'$_id',
//       instit:1,
//       services_person:1,
//       action:1,
//       services_parti:1
//     // Utiliser:{$subtract: [{$toInt: "$Logement"}, {$toInt: "$Vacants"}]}
//     }}

    ])
    .distinct('_id')