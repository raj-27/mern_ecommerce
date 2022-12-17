class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        const keyword = this.queryString.keyword ?
            {
                name: {
                    $regex: this.queryString.keyword, //
                    $options: "i",
                },
            } :
            {};
        console.log(keyword, "from api feature line 15");
        this.query = this.query.find({...keyword });
        return this;
    }
    filter() {
        const queryCopy = {...this.queryString };
        console.log(queryCopy, "Line no 21");
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        // Filter For Price and Rating
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (key) => `$${key}`
        );
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }
    pagination(Limit) {
        const currentPage = Number(this.queryString.page) * 1 || 1;
        const skip = Limit * (currentPage - 1);
        this.query = this.query.skip(skip).limit(Limit);
        return this;
    }
}
module.exports = ApiFeatures;