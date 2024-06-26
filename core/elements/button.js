import logger from "../../logger/logger.js";
import Element from './element.js';

export default class Button extends Element {
    page;

    constructor(locator, page){
        super(locator, page);
        this.page = page;
    }


    // Action: click on button using JS click
    async jsClick(timeout=Element.DEFAULT_TIMEOUT){
        logger.debug(`[JSCLICK] ${this.locator}`);
        try {
            await this.find(timeout);
            await this.page.$eval(this.locator, element => element.click());
        }
        catch (error) {
            logger.debug(`[ERROR] check selector, it must contain page`);
            this.page.isSuccess = false;
            throw new Error(error);
        }
    }

    // Action (Default): click on button using Puppeteer click
    async click(timeout=Element.DEFAULT_TIMEOUT){
        logger.debug(`[CLICK] ${this.locatorType}:${this.locator}`);
        try {
            await this.find(timeout);
            await this.element.click();
        }
        catch (error) {
            logger.debug(`[ERROR] check selector, it must contain page`);
            this.page.isSuccess = false;
            throw new Error(error);
        }
    }

    // Action: double click on button using Puppeteer double click
    async doubleClick(timeout=Element.DEFAULT_TIMEOUT){
        logger.debug(`[DOUBLECLICK] ${this.locatorType}:${this.locator}`);
        try {
            await this.find(timeout);
            await this.element.click({clickCount: 2});
        }
        catch (error) {
            logger.debug(`[ERROR] check selector, it must contain page`);
            this.page.isSuccess = false;
            throw new Error(error);
        }
    }

    // Action: right click on button using Puppeteer right click
    async rightClick(timeout=Element.DEFAULT_TIMEOUT){
        logger.debug(`[RIGHTCLICK] ${this.locatorType}:${this.locator}`);
        try {
            await this.find(timeout);
            await this.element.click({button: 'right',});
        }
        catch (error) {
            logger.debug(`[ERROR] check selector, it must contain page`);
            this.page.isSuccess = false;
            throw new Error(error);
        }
    }

    // Action: click on element if present, otherwise do not fail
    async clickIfAvailable(timeout=Element.DEFAULT_TIMEOUT){
        logger.debug(`[CLICKIFAVAILABLE] ${this.locatorType}:${this.locator}`);
        try {
            await this.find(timeout);
            await this.element.click();
            logger.debug(`[CLICK] ${this.locatorType}:${this.locator} found and clicked`);
        }
        catch (error) {
            logger.debug(`[SKIPPED] ${this.locatorType}:${this.locator} not available, skipping...`);
        }
    }

}