let xmlData;

function buildmenu(xml) {
  xmlData = xml;
  const title = $(xml).find('title').text();
  const fullName = $(xml).find('studentName').text();
  const loginName = $(xml).find('studentName').attr('studentLoginName');
  const studentNumber = $(xml).find('studentNumber').text();
  const program = $(xml).find('studentNumber').attr('program');
  const uiBlocks = ['ui-block-a', 'ui-block-b', 'ui-block-c'];

  // header
  const txtLbl = text => `<li class="ui-block-a yellow text-right mb-5">${text}</li>`;
  const txtVal = text => `<li class="ui-block-b mb-5">${text}</li>`;

  $('#home h1').html(title);
  $('#profile > div').append(`
      <ul class="ui-grid-a">
        ${txtLbl('Full Name')}
        ${txtVal(fullName)}
        ${txtLbl('Login Name')}
        ${txtVal(loginName)}
        ${txtLbl('Student #')}
        ${txtVal(studentNumber)}
        ${txtLbl('Program')}
        ${txtVal(program)}
      </ul>
    </section>
  `);

  // content
  $('#content').html(`
    <ul id="listbook" class="ui-grid-a">
    </ul>
  `);

  $(xml).find('book').each(function(n) {
    const bookImage = $(this).find('bookImage').text();
    const bookTitle = $(this).find('bookTitle').text();
    $('#listbook').append(`
      <li li-id=${n} class="${uiBlocks[n % 2]} bookitem">
        <a href="#popup" data-rel="dialog" data-transition="pop">
          <img class="ui-shadow bookcover" src="./images/${bookImage}" alt="image${n}">
          <p class="booktitle">${bookTitle}</p>
        </a>
      </li>
    `);
  });

  // footer
  $('#navhome').html(`
    <ul id="listnav" class="ui-grid-b">
    </ul>
  `);
  $(xml).find('bookStoreChain').each(function(n) {
    const bookStoreName = $(this).find('bookStore').text();

    $('#listnav').append(`
      <li li-id=${n} class=${uiBlocks[n]}>
        <a
          class='ui-btn ui-icon-${bookStoreName.toLowerCase().trim()} ui-btn-icon-top'
          href=${$(this).find('bookStore').attr('url')}
          target='_blank'
        >
          ${bookStoreName}
        </a>
      </li>
    `);
  });
}

// myscript.js for campus exercise
$(document).on('pagecreate', '#home', () => {
  $.ajax({
    type: 'POST',
    url: 'dataFiles/books.xml',
    dataType: 'xml',
    success(xml) {
      buildmenu(xml);
    },
    error(e) {
      alert(`${e.status}-${e.statusText}`);
    },
  }); // end of ajax
}); // end of document.on

function parseXML(choice) {
  const book = $(xmlData).find(`book:nth(${choice})`);
  const bookTitle = book.find('bookTitle').text();
  const bookImage = book.find('bookImage').text();
  const bookPrice = book.find('bookPrice').text();
  const bookInventoryID = book.find('bookInventoryID').text();
  const bookCategory = book.find('bookCategory').text();
  const bookDescription = book.find('bookDescription').text();

  $('#detail').html(`
    <h3>${bookTitle}</h3>
    <ul class="ui-grid-a">
      <li class="ui-block-a" style="width: 33%">
        <img class="ui-shadow bookcover-lg" src="./images/${bookImage}" alt="${bookImage}">
      </li>
      <li class="ui-block-b" style="width: 67%">
        <div class="mb-5"><span class="yellow">Price: </span>${bookPrice}</div>
        <div class="mb-5"><span class="yellow">Inventory ID: </span>${bookInventoryID}</div>
        <div><span class="yellow">Category: </span>${bookCategory}</div>
      </li>
    </ul>
    <div class="yellow mb-5">Description</div>
    <div>${bookDescription}</div>
  `);
}

$(document).on('click', 'ul#listbook > li', function() {
  const rowID = $(this).closest('li').attr('li-id');
  parseXML(rowID);
});
