/// <reference types="cypress" />
///<reference types="cypress-iframe" />
import 'cypress-iframe';
import * as pageObject from '../../fixtures/homepage/home-page-object.json';
import * as postDetailObject from '../../fixtures/postdetail/post-detail-page-object.json';
import * as userDetailObject from '../../fixtures/userdetail/user-detail-object.json';
import * as categoryPageObject from '../../fixtures/categorypage/category-page-object.json';
import * as data from '../../fixtures/testData.json';
beforeEach(function () {
    cy.viewport('macbook-15') ;
    cy.visit(data.testURL.homepage);
      cy.handleDownloadAppPopup();  
      cy.get(pageObject.loginBtn).click();
      cy.login();
      cy.get(pageObject.skipGuide).first().click()   
      cy.get(pageObject.skipGuide,{timeout:50000}).first().should('not.exist')
  })
 describe('1. Homepage for logged in user', () => {
    it('1.Homepage for logged in user-header', () => {
      cy.get(pageObject.header).compareSnapshotTest('1.1.homepage-loggedin-header',0.1,false,false);
      cy.get(pageObject.header).hideElement();
      cy.get(pageObject.adBanner).should('be.visible').compareSnapshotTest('1.2.homepage-loggedin-adbanner',0.1);
      cy.get(pageObject.monthTrendingSection).should('be.visible')
      cy.get(pageObject.feeds).should('be.visible')
      cy.get(pageObject.topAuthor).should('be.visible')
      cy.get(pageObject.specialPost).should('be.visible')
      cy.get(pageObject.guide).should('be.visible').compareSnapshotTest('1.3.homepage-loggedin-camnang',0.1);
      cy.get(pageObject.formRegister).should('be.visible').compareSnapshotTest('1.4.homepage-register-ntmn-form',0.1)
    })
  })
  describe('2. Logged in user is able to view post detail', () => {
    it('2.1. Logged in user click on a post in month trending section', () => {
      cy.get(pageObject.postTitleonMonthTrending).eq(1).invoke('text').then(text => {
        cy.wrap(text.replace('...', '').trim()).as('postTitle');
        })
      cy.get(pageObject.postTitleonMonthTrending).eq(1).click({force: true})
      cy.checkURL('bai-dang');
      cy.get('@postTitle').then(postTitle => {
          cy.get(postDetailObject.postTitle).invoke('text').should('contain', postTitle);
      })
    })
    it('2.2. Logged in user click on a post in for you section', () => {
      cy.get(pageObject.postTitleonForyou).first().invoke('text').then(text => {
        cy.wrap(text.replace('...', '').trim()).as('postTitle');
        })
      cy.get(pageObject.postTitleonForyou).first().click({force: true})
      cy.checkURL('bai-dang');
      cy.get('@postTitle').then(postTitle => {
          cy.get(postDetailObject.postTitle).invoke('text').should('contain', postTitle);
      })
    })
  })
  
  describe('3. Logged in user is able to view author', () => {

    it('3.1. Logged in user click on author name in popular', () => {
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
    it('3.2. Logged in user click on author name in month trending', () => {
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
    it('3.3. Logged in user click on author name in for your', () => {
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
  describe('4. Logged in user is able to view top 10', () => {
    it('4.1. Logged in user click on top 10 section', () => {
    cy.get(pageObject.top10).first().click();
    cy.checkURL('top-bai-viet');
    cy.get(postDetailObject.top10).invoke('text').then((text) => text.trim()).should("equal", '#TOP 10 BÀI VIẾT NỔI BẬT');
    })
   
  })
  describe('5. Verify the paging', () => {
    it('5.1. Logged in user click on a page in for you section', () => {
      cy.get(pageObject.page).then($page => {
              
        for (let i = 0; i < $page.length; i++) {  
            cy.wrap($page[i]).click();
            cy.checkURL('page_idx='+(i+1))
        }
    })
    })
    it('5.2. Logged in user click on author section', () => {
      cy.get(pageObject.topPost).click();
      cy.checkURL('sort=follow')
      cy.get(pageObject.page).then($page => {
              
        for (let i = 0; i < $page.length; i++) {  
            cy.wrap($page[i]).click();
            cy.checkURL('page_idx='+(i+1))
        }
    })
    })
    it('5.3. Logged in user click on latest section', () => {
        cy.get(pageObject.newPost).click();
        cy.checkURL('sort=new')
        cy.get(pageObject.page).then($page => {
                
          for (let i = 0; i < $page.length; i++) {  
              cy.wrap($page[i]).click();
              cy.checkURL('page_idx='+(i+1))
          }
      })
      })
      it('5.4. Logged in user select filter by controversial', () => {
        cy.get(pageObject.moreOption).click();
        cy.get(pageObject.hotPost).click();
        cy.checkURL('sort=controversial')
        cy.get(pageObject.page).then($page => {
                
          for (let i = 0; i < $page.length; i++) {  
              cy.wrap($page[i]).click();
              cy.checkURL('page_idx='+(i+1))
          }
      })
      })
      it('5.5. Logged in user select filter by old', () => {
        cy.get(pageObject.moreOption).click();
        cy.get(pageObject.oldbutgold).click();
        cy.checkURL('sort=old')
        cy.get(pageObject.page).then($page => {
                
          for (let i = 0; i < $page.length; i++) {  
              cy.wrap($page[i]).click();
              cy.checkURL('page_idx='+(i+1))
          }
      })
      })
      it('5.6. Logged in user select filter by old', () => {
        cy.get(pageObject.moreOption).click();
        cy.get(pageObject.top).click();
        cy.checkURL('sort=top')
        cy.get(pageObject.page).then($page => {
                
          for (let i = 0; i < $page.length; i++) {  
              cy.wrap($page[i]).click();
              cy.checkURL('page_idx='+(i+1))
          }
      })
      })
  })
  describe('6. Logged in user is able to view more top authors', () => {
    it('6.1. Logged in user click on more authors', () => {
    cy.get(pageObject.moreAuthors).click();
    cy.checkURL('thanh-vien-noi-bat');
    cy.get(postDetailObject.topAuthorsTitle).invoke('text').then((text) => text.trim()).should("equal", 'THÀNH VIÊN NỔI BẬT');
    })
   
  })
  describe('7. Logged in user is able to view more old but gold', () => {
    it('7.1. Logged in user click on more old but gold post', () => {
    cy.get(pageObject.moreoldbutgold).click();
    cy.checkURL('sort=old');
    cy.get(pageObject.moreOption).click();
    cy.get(pageObject.oldbutgold).invoke('attr','class').should('include','title-sub-link active')
    })
   
  })
  describe('8. Logged in user is able to create post from homepage', () => {
    it('8.1. Logged in user click on create post button', () => {
    cy.get(pageObject.createPost).click();
    cy.checkURL('bai-dang/viet-bai');
    })
   
  })
  describe('9. Logged in user is able to save/unsave a post', () => {
    it('9.1. Logged in user save a post in monthly posts', () => {
      cy.get(pageObject.postTitleonMonthTrending).eq(1).invoke('text').then(text => {
        cy.wrap(text.replace('...', '').trim()).as('postTitle');
        })
      cy.get(pageObject.btnSaveinMonthPost).first().click()
      cy.get(pageObject.savedPostIcon).should('be.visible')
      cy.get(pageObject.toastMessage,{timeout:3000}).should('be.visible')
      cy.get(pageObject.navbarUser).click()
      cy.get(pageObject.savedPost).click()
      cy.checkURL('?tab=savedPosts')
      cy.get('@postTitle').then(postTitle => {
        cy.get(userDetailObject.savedPostTitle).first().invoke('text').should('contain', postTitle);
      })
      cy.go('back');
      cy.get(pageObject.btnSaveinMonthPost).first().click()
      cy.get(pageObject.savedPostIcon).should('not.exist')
      cy.get(pageObject.toastMessage,{timeout:3000}).should('be.visible')
      cy.get(pageObject.navbarUser).click()
      cy.get(pageObject.savedPost).click()
      cy.checkURL('?tab=savedPosts')
      cy.get(userDetailObject.main).compareSnapshotTest('9.1.No-saved-post',0.1)
      
    })
    it.only('9.2. Logged in user save a post in popular posts', () => {
      cy.get(pageObject.postTitleonForyou).first().invoke('text').then(text => {
        cy.wrap(text.replace('...', '').trim()).as('postTitle');
        })
      cy.get(pageObject.btnSaveinMainContent).first().click({force: true})
      cy.get(pageObject.savedPostIcon).should('be.visible')
      cy.get(pageObject.toastMessage,{timeout:3000}).should('be.visible')
      cy.get(pageObject.navbarUser).click()
      cy.get(pageObject.savedPost).click()
      cy.checkURL('?tab=savedPosts')
      cy.get('@postTitle').then(postTitle => {
        cy.get(userDetailObject.savedPostTitle).first().invoke('text').should('contain', postTitle);
      })
      cy.go('back');
      cy.get(pageObject.btnSaveinMainContent).first().click({force: true})
      cy.get(pageObject.savedPostIcon).should('not.exist')
      cy.get(pageObject.toastMessage,{timeout:3000}).should('be.visible')
      cy.get(pageObject.navbarUser).click()
      cy.get(pageObject.savedPost).click()
      cy.checkURL('?tab=savedPosts')
      cy.get(userDetailObject.main).compareSnapshotTest('9.1.No-saved-post',0.1)
      
    })
  })