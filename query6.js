 db.getCollection("commune")
.aggregate([  
    
        {$project: {
        _id:0,
       code_insee:1,
        departement:1,
          region:1,
          Superficie:1
 
        
       
        //insee_com:{$cmp: [ "$CODGEO", "$commune_an.code_insee" ]} ,
        
    }},
   
           {$group: {_id:'$region', Id:{$addToSet:'$departement' } , superfie:{$addToSet: "$Superficie"}    }  },
           
           
                   {$project: {
                       _id:0,
        Region:'$_id',
       'Nombre de departements' :{$cond: { if: { $isArray: "$Id" }, then: { $size: "$Id" }, else: "NA"}},
       Superficie: {$sum:"$superfie"}

        
    }},


    ])