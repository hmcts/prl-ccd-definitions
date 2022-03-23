let Helper = codecept_helper;

const toString = sel => {
    if (typeof(sel) === 'string') return sel
    if (typeof(sel) === 'object') {
        return sel.css || sel.xpath
    }
}

class CustomHelper extends Helper {

    async getCurrentPage(selector) {
        let client = this.helpers['Puppeteer'];

        const page = await this.helpers['Puppeteer'].page;

       // console.log(client.page);
        return await page;
    }

    async getPup(selector) {
        return this.helpers['Puppeteer'];
    }

    async typeText(text) {
        let client = this.helpers['Puppeteer'];

        await client.page.keyboard.type(text)
    }

}

module.exports = CustomHelper;