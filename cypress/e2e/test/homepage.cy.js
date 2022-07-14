/// <reference types="cypress" />
import * as pageObject from '../../fixtures/homepage/home-page-object.json';
import * as postDetailObject from '../../fixtures/postdetail/post-detail-page-object.json';
import * as userDetailObject from '../../fixtures/userdetail/user-detail-object.json';
import * as data from '../../fixtures/testData.json';
beforeEach(function () {
  cy.viewport('macbook-15')     
})
describe('1. The download App popup should be show at the first time', () => {
  it('1. The download App popup should be show at the first time', () => {
    cy.visit(data.testURL.homepage);
    cy.get(pageObject.downloadAppPopup).last().should('be.visible');
    cy.get(pageObject.closeDownloadAppPopup).click();
    cy.get(pageObject.downloadAppPopup).last().should('not.be.visible');
 
  })
})
describe('2. Home page for non logged in user', () => {
  beforeEach(function () {
    cy.visit(data.testURL.homepage);
    cy.handleDownloadAppPopup();  
  })
  it('2.1. Homepage non logged in user- header', () => {
    cy.get(pageObject.header).compareSnapshotTest('2.1.homepage-header',0.1,false,false)
  })
  it('2.2. Homepage non logged in user- banner', () => {
    cy.get(pageObject.header).hideElement();
    cy.get(pageObject.banner).compareSnapshotTest('2.2.homepage-banner',0.1)
    cy.get(pageObject.popularSection).should('be.visible')
  })
  it('2.3. Homepage non logged in user- ad banner', () => {
    cy.get(pageObject.header).hideElement();
    cy.get(pageObject.adBanner).should('be.visible').compareSnapshotTest('2.3.ad-banner',0.1);
  })
  it('2.4. Homepage non logged in user- maincontent', () => {
    cy.get(pageObject.monthTrendingSection).should('be.visible')
    cy.get(pageObject.feeds).should('be.visible')
  })
  it('2.5. Homepage non logged in user- category', () => {
    cy.get(pageObject.header).hideElement();
    cy.get(pageObject.categoty).should('be.visible').compareSnapshotTest('2.5.homepage-category',0.1)
  })
  it('2.6. Homepage non logged in user- register ntmn form', () => {
    cy.get(pageObject.header).hideElement();
    cy.get(pageObject.formRegister).should('be.visible').compareSnapshotTest('2.6.homepage-register-ntmn-form',0.1)
  })
  it('2.7. Homepage non logged in user- paging', () => {
    cy.get(pageObject.header).hideElement();
    cy.get(pageObject.paging).should('be.visible').compareSnapshotTest('2.7.homepage-paging',0.1)
  })
  it('2.8. Homepage non logged in user- footer', () => {
    cy.get(pageObject.footer).scrollIntoView();
    cy.get(pageObject.footer).compareSnapshotTest('2.8.homepage-footer',false,false)
  })
})
describe('3. Non logged in user action in Homepage', () => {
  beforeEach(function () {
    cy.visit(data.testURL.homepage);
    cy.handleDownloadAppPopup();  
  })
  it('3.1. Non logged in user click on Create post button', () => {
    cy.get(pageObject.btnCreatePost).click()
    cy.checkURL(data.testURL.loginURL);
  })
  it('3.2. Non logged in user click on Save post in popular section', () => {
    cy.get(pageObject.btnSavePopular).click();
    cy.checkURL(data.testURL.loginURL);
  })
  it('3.3. Non logged in user click on save post in monthly post ', () => {
    cy.get(pageObject.btnSaveinMonthPost).first().click()
    cy.checkURL(data.testURL.loginURL);
  })
  it('3.4. Non logged in user click on save post in main content', () => {
    cy.get(pageObject.btnSaveinMainContent).first().click()
    cy.checkURL(data.testURL.loginURL)
  })
  it('3.5. Non logged in user click on upvote icon ', () => {
    cy.get(pageObject.btnSaveinMainContent).eq(1).click()
    cy.checkURL(data.testURL.loginURL)
  })
  it('3.6. Non logged in user click on comment icon', () => {
    cy.get(pageObject.btnSaveinMainContent).eq(2).click()
    cy.checkURL('#comments')
  })
 
})
describe('4. Non logged in user is able to view post detail', () => {
  beforeEach(function () {
    cy.visit(data.testURL.homepage);
    cy.handleDownloadAppPopup();  
  })
  it('4.1. Non logged in user click on a post in Popular section', () => {
    cy.get(pageObject.postTitleonPopular).invoke('text').then(text => {
      cy.wrap(text).as('postTitle');
      })
    cy.get(pageObject.postTitleonPopular).click()
    cy.checkURL('bai-dang');
    cy.get('@postTitle').then(postTitle => {
        cy.get(postDetailObject.postTitle).should('include.text', postTitle);
    })
  })
  it('4.2. Non logged in user click on a post in month trending section', () => {
    cy.get(pageObject.postTitleonMonthTrending).eq(1).invoke('text').then(text => {
      cy.wrap(text).as('postTitle');
      })
    cy.get(pageObject.postTitleonMonthTrending).eq(1).click()
    cy.checkURL('bai-dang');
    cy.get('@postTitle').then(postTitle => {
        cy.get(postDetailObject.postTitle).should('include.text', postTitle);
    })
  })
  it('4.3. Non logged in user click on a post in for you section', () => {
    cy.get(pageObject.postTitleonForyou).invoke('text').then(text => {
      cy.wrap(text.trim()).as('postTitle');
      })
    cy.get(pageObject.postTitleonForyou).click({force: true})
    cy.checkURL('bai-dang');
    cy.get('@postTitle').then(postTitle => {
        cy.get(postDetailObject.postTitle).should('include.text', postTitle);
    })
  })
})
describe('5. Non logged in user is able to view author', () => {
  beforeEach(function () {
    cy.visit(data.testURL.homepage);
    cy.handleDownloadAppPopup();  
  })
  it('5.1. Non logged in user click on author name in popular', () => {
    cy.get(pageObject.authorName).first().invoke('text').then(text => {
      cy.wrap(text.trim()).as('authorName');
      })
    cy.get(pageObject.authorName).first().click()
    cy.checkURL('nguoi-dung');
    cy.wait(1500)
    cy.get('@authorName').then(authorName => {
        cy.get(userDetailObject.userName).invoke('text').then((text) => text.trim()).should("equal", authorName);
    })
  })
  it('5.2. Non logged in user click on author name in month trending', () => {
    cy.get(pageObject.authorNameinMonthTrending).first().invoke('text').then(text => {
      cy.wrap(text.trim()).as('authorName');
      })
    cy.get(pageObject.authorNameinMonthTrending).first().click()
    cy.checkURL('nguoi-dung');
    cy.wait(1500)
    cy.get('@authorName').then(authorName => {
        cy.get(userDetailObject.userName).invoke('text').then((text) => text.trim()).should("equal", authorName);
    })
  })
  it('5.3. Non logged in user click on author name in for your', () => {
    cy.get(pageObject.authorNameinForyou).first().invoke('text').then(text => {
      cy.wrap(text.trim()).as('authorName');
      })
    cy.get(pageObject.authorNameinForyou).first().click()
    cy.checkURL('nguoi-dung');
    cy.wait(1500)
    cy.get('@authorName').then(authorName => {
        cy.get(userDetailObject.userName).invoke('text').then((text) => text.trim()).should("equal", authorName);
    })
  })
})
describe('6. Non logged in user is able to view top 10', () => {
  beforeEach(function () {
    cy.visit(data.testURL.homepage);
    cy.handleDownloadAppPopup();  
  })
  it('6.1. Non logged in user click on top 10 section', () => {
   cy.get(pageObject.top10).first().click();
   cy.checkURL('top-bai-viet');
   cy.get(postDetailObject.top10).invoke('text').then((text) => text.trim()).should("equal", '#TOP 10 BÀI VIẾT NỔI BẬT');
  })
 
})
    
    

