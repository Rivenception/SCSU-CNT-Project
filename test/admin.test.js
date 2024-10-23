/* const assert = require('chai').assert;
const adminModule = require('../public/assets/js/admin');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Employee = require('../models/employee')
const html = require('../views/layouts/main.handlebars')
global.$ = require('jquery')(window);
global.document = document; 


describe('adminModule', () =>{
    var doc = jsdom.JSDOM(html),
    window = doc.parentWindow,
    $ = global.jQuery = require('jquery')(window);
    it('newEmployee is object', () => {
        const newEmployee = new Employee({
            employee_id: 5,
            name: 'Frank',
            dept: 'Tutoring',
            title: 'Awesome',
            salary: 'not enough',
        })
       assert.isObject(newEmployee, "employee is object");
    }
)});
 */

