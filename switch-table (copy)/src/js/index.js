import '../css/index.scss';

class SwitchTable {
    constructor() {
        this.columnOrders = {
            'user id': 0,
            'family name': 1, 
            'given name': 2, 
            'user name' : 3, 
            'programs': 4, 
            'status': 5, 
            'avg session': 6, 
            'last active': 7,
            'custom field 1': 8,
            'custom field 2': 9
        };
    
        this.activeColumns = ['user id', 'family name', 'given name', 'user name', 'programs', 'status', 'avg session', 'last active'];
        this.hiddenColumns = ['custom field 1', 'custom field 2'];
    }

    init() {
        document.querySelectorAll('.ft-header.ft-column')[8].classList.add('hidden');
        document.querySelectorAll('.ft-header.ft-column')[9].classList.add('hidden');
    }
}

window.addEventListener('load', () => {
    const tbl = new SwitchTable();
    tbl.init();
});