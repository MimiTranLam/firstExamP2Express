const companyController = {}
const { Console } = require('console');
const e = require('express');
const fs = require('fs');

companyController.getCompanies = (req, res, next) => {
    console.log("getting companies");
    console.log("get all query", req.query);

    const { page, city, sortBy } = req.query;
    const reqPage = parseInt(page) || 1;
    const limit = 20;

    try {
        const rawData = fs.readFileSync('data.json', 'utf8');
        const data = JSON.parse(rawData);
        const companyList = data.companies;
        let result = data.jobs;
        
        if (typeof reqPage === 'number') {
            result = data.companies;
        };

        if (sortBy) {
            ratings = [];
            const allRatings = data.companies.forEach(e => {
                ratings.push(e.numOfRatings);
            });
            const sortRatings = ratings.sort();
            console.log(sortRatings);

            const top20Ratings = [];
            for (let i = (sortRatings.length - 1); i < 21; i--) {
                top20Ratings.push(sortRatings[i]);
            };
            for (let i = 0; i < top20Ratings.length; i++) {
                const top20Companies = data.companies.filter((e) => e.numOfRatings === top20Ratings[i]);
            }
        };

        if (city) {
            cityValArr = city.split(",");
            let cityResult = [];
            for (let i = 0; i < cityValArr.length; i++) {
                let iCityResult = data.jobs.filter((x) => x.city.toLowerCase() === cityValArr[i].toLowerCase());
                cityResult.push(iCityResult);
            }
            console.log(cityResult);

            // result = data.jobs.filter((x) => x.city.toLowerCase() === v.toLowerCase());
            // result = cityValArr.forEach(v => {
            //     console.log(data.jobs[0].city);
            //     //data.jobs.filter((x) => x.city.toLowerCase() === v.toLowerCase());
            // });
        }

        // pagination
        result = result.slice( ((reqPage - 1)*20), ((reqPage*limit)+1) );

        return res.status(200).send( {result} );
    } catch (error) {
        next(error);
    }
};

companyController.createCompany = (req, res, next) => {
    console.log("getting companies");

    const {
        companyId,
        name,
        benefits,
        description,
        ratings,
        jobs,
        numOfJobs,
        numOfRatings
    } = req.body;

    if (
        typeof companyId !== "string" ||
        typeof name !== "string" ||
        typeof benefits !== "object" || Object.values(benefits) !== "boolean" ||
        typeof description !== "string" ||
        Array.isArray(ratings) || !ratings || ratings.length < 1 ||
        Array.isArray(jobs) || !jobs || jobs.length < 1 ||
        typeof numOfJobs !== "number" ||
        typeof numOfRatings !== "number"
    ) {
        throw new Error("MISSING INFO");
    }

    const companyStructure ={
        companyId,
        name,
        benefits: {},
        description,
        ratings: [],
        jobs: [],
        numOfJobs,
        numOfRatings
    };

    constId = randomUUID();

    const newCompany = req.body;

    const jsonContent = JSON.stringify(newCompany);
    fs.writeFileSync('data.json', jsonContent);
    const result = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(result);

    return res.status(200).send("created");
};

companyController.updateCompanyById = (req, res, next) => {
    console.log("getting companies");

    const { id, enterprise } = req.params;

    try {
        if (!id) {
            throw new Error("No id received");
        }

        const rawData = fs.readFileSync('data.json', 'utf8');
        const data = JSON.parse(rawData);
        let result = data.companies;

        if (typeof enterprise !== "boolean") {
            throw new Error("Wrong info");
        }

        const update = result.map((x) => {
            if (x.id === id) {
            x.enterprise = req.params.enterprise;
            }
            return x;
        });

        data.companies = update;
        const newData = JSON.stringify(data);

        fs.writeFileSync('data.json', update);

        return res.status(200).send("updated: " + update + ", full data: " + data);

    } catch (error) {
        next(error);
    }
};

companyController.deleteCompanyById = (req, res, next) => {
    console.log("getting companies");
    const { id } = req.params;

    if (!id) {
        throw new Error("No id received");
    }

    const database = fs.readFileSync('data.json', 'utf8');
    let jsObject = JSON.parse(database);
    jsObject = jsObject.filter((e) => e.id !== id);

    let newData = JSON.stringify(jsObject);
    fs.writeFileSync("data.json", newData);

    return res.send("success delete");
};

module.exports = companyController;