import '../css/index.scss';

class SwitchTable {
  constructor() {

    // stores the initial order
    this.columnOrders = {
      0: 'user id',
      1: 'family name',
      2: 'given name',
      3: 'user name',
      4: 'programs',
      5: 'status',
      6: 'avg session',
      7: 'last active',
      8: 'custom field 1',
      9: 'custom field 2',
    };

    this.columns = ['user id', 'family name', 'given name', 'user name', 'programs', 'status', 'avg session', 'last active', 'custom field 1', 'custom field 2'];
    this.hiddenColumns = ['custom field 1', 'custom field 2'];
    this.totalCols = this.columns.length;
    this.noOfRecords = document.querySelectorAll('.ft-row').length; //includes header as well
  }

  //initialize with all the event listners
  init() {
    // get no of records
    const { totalCols, noOfRecords } = this;
    const columnsNodes = document.querySelectorAll('.ft-row .ft-column');

    //hide the last 2 columns
    for (let i = 0; i < noOfRecords; i++) {
      columnsNodes[(i * totalCols) + 8].classList.add('hidden');
      columnsNodes[(i * totalCols) + 9].classList.add('hidden');
    }

    //add onclick event listeners to all headers
    const drpDwnList = document.querySelectorAll('.ft-header .ft-column');
    [...drpDwnList].forEach(item => {
      item.onclick = null;
      item.addEventListener('click', (e) => this.toggleDropDown(e));
    });

    document.addEventListener("click", (event) => {
      // If user clicks inside the element, do nothing
      if (event.target.closest('.ft-header .ft-column')) return;
    
      // If user clicks outside the element, hide it!
      this.hideOtherDrpDwn();
    });
  }

  hideOtherDrpDwn(col) {
    const drpDwnList = document.querySelectorAll('.ft-header .ft-column');
    [...drpDwnList].forEach((item, index) => {
      if(index !== Number(col)) {
        item = item.querySelector('.dropdown-content');
        item.classList.remove('show');
      }
    });
  }
  // toggle the outer dropdown
  toggleDropDown(event) {
    event.stopPropagation();
    event.preventDefault();

    this.hideOtherDrpDwn(event.target.closest('.drp-dwn-div').getAttribute('data-col'));

    if (event.target.matches('.dropdown-option')) {
      this.performSwitch(event);
    }

    const item = event.currentTarget.querySelector('.dropdown-content');
    if (item) {
      if (item.classList.contains('show')) {
        item.classList.remove('show');
      } else {
        item.classList.add('show');
      }
    }
  }

  updateTableData(oldCol, newCol) {
    //update hidden columns
    const index = this.hiddenColumns.indexOf(this.columns[newCol]);
    this.hiddenColumns.splice(index, 1, this.columns[oldCol]);
    //update position in columns array
    [this.columns[oldCol], this.columns[newCol]] = [this.columns[newCol], this.columns[oldCol]];

  }

  //update dropdown option
  updateDropdownOpt(el, colNumber) {
    const options = el.querySelectorAll('.dropdown-option');
    if (options.length === 2) {
      const opt = this.creatOption(this.columnOrders[colNumber]);
      el.appendChild(opt);
    } 
  }

  // create an anchor tag for dropdown option
  creatOption(value) {
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    a.setAttribute('class', 'dropdown-option');
    a.innerHTML = value;
    return a;
  }

  // check and switch columns
  performSwitch(event) {
    document.querySelector('.error-msg').classList.add('hide-error-msg');
    event.stopPropagation();
    event.preventDefault();
    const el = event.target.closest('.drp-dwn-div');

    if (el) {
      const col = el.getAttribute("data-col");
      const colName = this.columns[col];

      //if clicked option is not the same as shown column, then only switch
      if (!(event.target.innerHTML.toLowerCase()).includes(colName)) {

        const newCol = this.columns.indexOf(event.target.innerHTML.toLowerCase());
        if(newCol < this.totalCols - 3) {
          //if column is shown already, then display error message
          document.querySelector('.error-msg').classList.remove('hide-error-msg');
        } else {

          if (newCol) {
            const cols = document.querySelectorAll('.drp-dwn-div');
            // replace the header with the replaced one
            const temp = cols[col].innerHTML;
            cols[col].innerHTML = cols[newCol].innerHTML;
            cols[newCol].innerHTML = temp;

            // update the dropdown options
            this.updateDropdownOpt(cols[col].querySelector('.inner-dropdown-content'), col);

            // replace all the records with the new column selected
            const records = document.querySelectorAll('.ft-row:not(.ft-header)');
            for (const record of records) {
              const cols = record.querySelectorAll('.ft-column');
              const temp = cols[col].innerHTML;
              cols[col].innerHTML = cols[newCol].innerHTML;
              cols[newCol].innerHTML = temp;
            }
            this.updateTableData(col, newCol);
          }
        }
      }

    }
  }

}

window.addEventListener('load', () => {
  const tbl = new SwitchTable();
  tbl.init();
});