 db.getCollection("Analyse-commune")
.aggregate([  
    
        {$project: {
        _id:0,
        CODGEO:1,
      DEP:1,
      REG:1,
        region:1,
   'Reg Moyenne Salaires Cadre Horaires':1,
   'Reg Moyenne Salaires Prof Intermédiaire Horaires':1,
   'Reg Moyenne Salaires Employé Horaires':1,
   'Reg Moyenne Salaires Ouvrié Horaires':1

        
    }},
  
           {$group: {_id:'$DEP', 
           Cadre:{$avg:'$Reg Moyenne Salaires Cadre Horaires'},
           Prof:{$avg:'$Reg Moyenne Salaires Prof Intermédiaire Horaires'},
           Employe:{$avg:'$Reg Moyenne Salaires Employé Horaires'}, 
           Ouvrier:{$avg:'$Reg Moyenne Salaires Ouvrié Horaires'}, 
           id:{ $addToSet: "$CODGEO"} }   },


           
        {
 $lookup:
    {
        from: "commune",
        localField: "id",
        foreignField : "code_insee",
        as: "commune_an"
    }   , 
   
},
         { $unwind: "$commune_an"}  ,     
                  {$project: {
        _id:0,
      departement:'$commune_an.region',
      Cadre:1,
      Prof:1,
      Employe:1,
      Ouvrier:1

        
    }},
   
   
  {$group:{_id : "$departement", Cadres:{$avg :"$Cadre"}, Prof:{$avg :"$Prof"}, Employe:{$avg :"$Employe"}, Ouvrier:{$avg :"$Ouvrier"}}},

    ])
 