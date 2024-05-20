// eslint-disable-next-line no-undef
const I = actor();

class CodeceptMochawesomeLog {
  getDate() {
    const d = new Date();
    const magicNum = 10;
    const hh = d.getHours() < magicNum ? `0${d.getHours()}` : d.getHours();
    const mm = d.getMinutes() < magicNum ? `0${d.getMinutes()}` : d.getMinutes();
    const ss = d.getSeconds() < magicNum ? `0${d.getSeconds()}` : d.getSeconds();

    return `[${hh}:${mm}:${ss}]`;
  }


  AddMessage(message) {
    I.addMochawesomeContext(this.getDate() + message);
    console.log(this.getDate() + message);
  }


  AddJson(json) {
    const jsonIndent = 2;
    I.addMochawesomeContext(this.getDate() + JSON.stringify(json, null, jsonIndent));
    console.log(this.getDate() + JSON.stringify(json, null, jsonIndent));
  }
}

module.exports = new CodeceptMochawesomeLog();