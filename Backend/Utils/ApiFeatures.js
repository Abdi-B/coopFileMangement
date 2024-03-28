class ApiFeatures{
    
    constructor(query, queryStr){
        // query and queryStr can only accessible in constructor so we have to use this.parameter
        this.query = query;
        this.queryStr = queryStr;

    }
    
    createPost(){
        const posts =  this.query.create(this.queryStr)
        // console.log(posts)
        res.status(200).json(posts)

        return this;
    }
}

module.exports = ApiFeatures;