 db.getCollection("commune")
.aggregate([  
    
           {$match: {'Commune':'NANTES' }   },
           
        {
 $lookup:
    {
        from: "Analyse-commune",
        localField: "code_insee",
        foreignField : "CODGEO",
        as: "commune_an"
    }
    
    

}


    ])