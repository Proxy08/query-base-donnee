 db.getCollection("Analyse-commune")
.aggregate([ {
     $lookup:
    {
        from: "commune",
        localField: "CODGEO",
        foreignField : "code_insee",
        as: "commune_an"
    }  
    
  { $unwind: "$commune_an"}
    {$project: {
        _id:0,
        CODGEO:1,
        LIBGEO:1,
        'Nb Homme':1 , //{ $divide: [ { $toInt: "$Nb Homme" } , 2 ] },
        'Nb Femme': 1, //{ $divide: [{$toInt: "$Nb Femme"}, 2 ] },
        //Population:1
        Region:"$commune_an.region",
        //population:"$commune_an.Population"
        
       
        //insee_com:{$cmp: [ "$CODGEO", "$commune_an.code_insee" ]} ,
        
    }}
   
    {$match: {$or: [{'Nb Homme': {$gt:200000 }},{'Nb Femme': {$gt: 200000}}]}    }
     
    
    
 
 //   {$unwind: "$commune_an"}
    
}
 { $sort: {region:-1}}

    ])

    // .project({})
    // .sort({_id:-1})
    .limit(100)
// .find({})
//   .sort({_id:-1})
//   .limit(100)