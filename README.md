# test

# Questions and answers to Part 2

## Tasks

- Create a file named data.json and load data
  As a client app I can make a GET request to http://localhost:5000/companies and receive back an array of 20 companies.
- As a client app I can make a GET request to http://localhost:5000/companies?page=2 and receive an array, the 2nd array of 20 companies(nums 20-40).
- As a client app I can make a GET request to http://localhost:5000/companies?page=3 and receive an array, the 3rd array of 20 companies(nums 40-60).
- As a client app I can make a GET request to http://localhost:5000/companies?page=n and receive an array, the nth array of 20 companies.
- As a client app I can make a GET request to http://localhost:5000/companies?city=Miami and receive back a list of companies that have jobs located in Miami.
- As a client app I can make a GET request to http://localhost:5000/companies?city=Miami,New%20York. and receive back a list of companies with jobs in those cities Miami & New York.
- As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings and receive back an array of 20 companies sorted by average ratings(average high score computed of all 5 criteria) combined compared to all other companies in asc order by default.
- As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings&order=asc and receive back an array of 20 companies sorted by the top 5 average ratings combined compared to all other companies in asc order.
- As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings&order=desc and receive back an array of 20 companies sorted by the top 5 average ratings combined compared to all other companies in desc order.
- As a client app I can make a POST request to add a new company with exact structure
- As a client app I can make a PUT request to http://localhost:5000/companies/:id and add a property enterprise, which is true,
- As a client app I can make a DELETE request to http://localhost:5000/companies/:id delete a company by id.
