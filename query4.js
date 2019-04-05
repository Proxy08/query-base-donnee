 db.getCollection("commune")
.aggregate([  {$group: {_id: '$region','Superficie':{$sum: "$Superficie"}, 'Population':{$sum: "$Population"} }}

    ])


 .project({
     _id:0,
     Region:"$_id",
     Superficie:1,
     Population:1
   
 })
     .sort({Superficie:-1})
