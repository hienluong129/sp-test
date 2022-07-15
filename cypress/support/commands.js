/// <reference types="cypress-xpath" />
///<reference types="cypress-iframe" />
import 'cypress-iframe';
import * as pageObject from '../fixtures/homepage/home-page-object.json';
Cypress.Commands.add('openURL', (url) => {
    let cookieName = Cypress.env("cookieName");
    let cookieValue = Cypress.env("cookieValue");
    let queryString = Cypress.env("queryString");

    if (url.includes('?')) {
        url = url + '&' + queryString;
    } else {
        url = url + '?' + queryString;
    }
    cy.visit(url, {
        headers: {
            "Accept-Encoding": "gzip, deflate",
            "Connection": "Keep-Alive"
        }
    });

    cy.setCookie(cookieName, cookieValue);
    cy.getCookie(cookieName).should(
        'have.property',
        'value',
        cookieValue
    )
})
Cypress.Commands.add('checkURL', (link, exactResult) => {
    cy.location('href', { timeout: 60000 }).should(url => {
        if (exactResult)
            expect(url).to.endsWith(link);
        else
            expect(url).to.include(link);
    })
})
const compareSnapshotCommand = require('cypress-image-diff-js/dist/command')
compareSnapshotCommand();
function compareSnapshotTestCommand(defaultScreenshotOptions) {
    var height = process.env.HEIGHT || 900;
    var width = process.env.WIDTH || 1440; // Force screenshot resolution to keep consistency of test runs across machines
    
    Cypress.config('viewportHeight', height);
    Cypress.config('viewportWidth', width);
    Cypress.Commands.add('compareSnapshotTest', {
        prevSubject: 'optional'
    }, function (subject, name, percentage, ignoreError = false, checkLazyload = true) {
        console.log('ignore',ignoreError)
        if (checkLazyload) checkLazyloadImages(subject ? subject : pageObject.common.body);
        cy.wait(2000);
        var testThreshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        cy.log('threshold is ' + testThreshold);
        var specName = Cypress.spec.name;
        var testName = "".concat(specName.replace('.js', ''), "/").concat(name); 
        
        // Take a screenshot and copy to baseline if it does not exist
        //check if file exist
        cy.task('checkExist', './cypress-visual-screenshots/baseline/' + testName + '.png').then((result) => {
            if(result) cy.log(testName + '.png' + ' is already existed. Comparing ')
            else cy.log(testName + '.png' + ' does not exist. Taking baseline')
        })
        
        var objToOperateOn = subject ? cy.get(subject) : cy;
        objToOperateOn.screenshot(testName, defaultScreenshotOptions).task('copyScreenshot', {
            testName: testName
        }); 
        // Compare screenshots
        var options = {
            testName: testName,
            testThreshold: testThreshold
        };
        cy.task('compareSnapshotsPlugin', options).then(function (percentage) {
            if (percentage > testThreshold) {
                if (ignoreError) {
                    cy.log("The image " + testName + " difference percentage ".concat(percentage, " exceeded the threshold: ").concat(testThreshold));
                    return cy.wrap(false);
                } else throw new Error("The image " + testName + " difference percentage ".concat(percentage, " exceeded the threshold: ").concat(testThreshold));
            } else {
                cy.log(name + ": passed with different percentage of " + percentage.toFixed(2));
                cy.task('unlink', './cypress-visual-screenshots/comparison/' + testName + '.png');
                return cy.wrap(true);
            }
        });
    });
};
compareSnapshotTestCommand();

function checkLazyloadImages(element) {
    //cy.log('Scrolling to all lazy load images');
    cy.get(element, { log: false }).then($ele => {
        if ($ele.find('img', { log: false }).length > 0) {
            cy.scrollTo('bottom', { duration: 3000, ensureScrollable: false})

        }
    })
}
Cypress.Commands.add('handleDownloadAppPopup', () => {
    cy.get("body").wait(2000).then($body => {
        if ($body.find(pageObject.closeDownloadAppPopup).length > 0) {
                    cy.get(pageObject.closeDownloadAppPopup).click();
                    cy.get(pageObject.closeDownloadAppPopup).should('not.visible')
                }
            })
        }
    )