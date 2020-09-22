let Instance = null;

export default class {
    /**
     * For single ton
     */
    static getInstance() {
        if(Instance == null) {
            Instance = new this;
        }
        return Instance;
    }

    /**
     * Copy text
     *
     * @param text
     */
    copy(text) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
